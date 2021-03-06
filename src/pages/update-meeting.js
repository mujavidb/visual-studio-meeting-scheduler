import React, { Component } from "react"
import CreateCalendar from '../components/create-calendar'
import AutosuggestUser from '../components/autosuggest-user'
import MarkdownEditor from '../components/markdown-editor'
import axios from 'axios'
import LoadingImage from '../components/loading-image'
import moment from 'moment'

export default class UpdateMeeting extends Component {
	constructor(props){
		super(props)
		this.updateMarkdown = this.updateMarkdown.bind(this)
		this.updateTimeSlots = this.updateTimeSlots.bind(this)
		this.updateAttendees = this.updateAttendees.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.state = {
			loading: true,
			meeting: {},
			markdown_text: '',
			timeSlots: [],
			errors: [],
			formSubmitted: false,
			attendees: [],
			updated: false,
			changedTimeslots: false
		}
		this._titleInput = {}
		this._locationInput = {}
	}
	updateMarkdown(text){
		this.setState({markdown_text: text, updated: true})
	}
	updateTimeSlots(newTimeSlots){
		this.setState({timeSlots:newTimeSlots, changedTimeslots: true, updated: true})
	}
	updateAttendees(attendees){
		this.setState({attendees: attendees, updated: true})
	}
	validateInput(){
		const errors = []
		if (this._titleInput.value === "") {
			errors.push("You need to add a title.")
		}
		if (this._locationInput.value === "") {
			errors.push("You need to add a location.")
		}
		if (this.state.timeSlots.length === 0 && this.state.changedTimeslots){
			errors.push("You need to select some availability slots on the calendar.")
		}
		if (this.state.attendees.length === 0){
			errors.push("You need to add attendees to the meeting.")
		}
		this.setState({errors: errors, updated: false})
		return errors.length === 0 ? true : false
	}
	onSubmit(){
		this.setState({formSubmitted: true})

		if (this.validateInput()){
			let attendees = []
			if(this.state.changedTimeslots) {
				attendees = this.state.attendees.map(a=>({ 
					id: a.id, 
					name: a.name, 
					response: 0,
					availableTimes: []
				}))
			} else {
				attendees = this.state.attendees.map(a=>({ 
					id: a.id, 
					name: a.name, 
					response: a.response ? a.response : 0,
					availableTimes: a.availableTimes ? a.availableTimes : []
				}))
			}
			const data = {
				"meetingName": this._titleInput.value,
				"hostAvailability": this.state.timeSlots.map(a=>({dateStart: a.start.toISOString(), dateEnd: a.end.toISOString()})),
				"meetingLocation": this._locationInput.value,
				"attendees": attendees,
				"agenda": this.state.markdown_text
			}
			const _this = this
			const context = VSS.getWebContext()
			axios({
				method: 'post',
				url: `https://meeting-scheduler.azurewebsites.net/${context.account.id}/${this.props.meetingId}/edit`,
				data: data,
				withCredentials: true
			})
			.then(function (response) {
			    _this.props.ctrl.dashboard.call();
			})
			.catch(function (error) {
			    console.log(error);
			})
		}
	}
	componentDidMount(){
		this.getMeeting()
	}
	componentDidUpdate(){
		if (this.state.formSubmitted && this.state.updated) {
			this.validateInput()
		}
	}
	getMeeting(){
		let context = VSS.getWebContext();
		let _this = this;
		axios({
			method: 'get',
			url: `https://meeting-scheduler.azurewebsites.net/${context.account.id}/${this.props.meetingId}/get`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({meeting: response.data[0].meeting, attendees: response.data[0].meeting.attendees, markdown_text: response.data[0].meeting.agenda, loading: false});
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	render(){
		
		let content
		if (this.state.loading) {
			content = (
				<div className="loading-container">
					<LoadingImage />
					<span>Loading Content...</span>
				</div>
			)
		} else {
			let errors
			if (this.state.errors.length > 0){
				errors = (
					<section>
						<ul className="error_list">
							{this.state.errors.map(e=><li key={e}>{e}</li>)}
						</ul>
					</section>
				)
			}
			let availability
			if (!this.state.meeting.finalDate) {
				availability = (
					<section>
						<h3>Availability</h3>
						<CreateCalendar
							editTimeSlots={this.state.meeting.hostAvailability}
							onChangeTimeSlots={this.updateTimeSlots}/>
					</section>
				)
			}
			let attendees
			if (this.state.meeting.finalDate && moment(this.state.meeting.finalDate.dateStart).isAfter(moment())) {
				attendees = (
					<section>
						<h3>Attendees</h3>
						<AutosuggestUser
							originalData={this.props.teamMembers}
							oldValue={this.state.meeting.attendees}
							update={this.updateAttendees}/>
					</section>
				)
			}
			content = (
				<div className="large_card_area create_meeting">
					<header>
						<div className="topbar">
							<h2 className="container_title">Edit Meeting</h2>
						</div>
					</header>
					<main>
						<section>
							<h3>Title</h3>
							<input
								ref={x=>this._titleInput = x}
								type="text"
								placeholder="Enter meeting title"
								defaultValue={this.state.meeting.meetingName}
								onChange={()=>this.state.formSubmitted ? this.validateInput() : ""}/>
						</section>

						<section>
							<h3>Location</h3>
							<input
								ref={x=>this._locationInput = x}
								type="text"
								placeholder="Enter meeting location"
								defaultValue={this.state.meeting.meetingLocation}
								onChange={()=>this.state.formSubmitted ? this.validateInput() : ""}/>
						</section>

						<section>
							<h3>Agenda</h3>
							<MarkdownEditor
								oldValue={this.state.meeting.agenda}
								update={this.updateMarkdown}/>
						</section>

						{ availability }

						{ attendees }

						{ errors }

						<footer>
							<button onClick={this.props.ctrl.dashboard} className="button cancel maxed">Cancel</button>
							<button onClick={this.onSubmit} className="button primary maxed">Update</button>
						</footer>
					</main>
				</div>
			)
		}
		return content;
	}
}