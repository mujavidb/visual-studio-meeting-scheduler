import React, { Component } from "react"
import CreateCalendar from '../components/create-calendar'
import AutosuggestUser from '../components/autosuggest-user'
import MarkdownEditor from '../components/markdown-editor'
import axios from 'axios'
import LoadingImage from '../components/loading-image'

export default class UpdateMeeting extends Component {
	constructor(props){
		super(props)
		this.updateMarkdown = this.updateMarkdown.bind(this)
		this.updateTimeSlots = this.updateTimeSlots.bind(this)
		this.updateAttendees = this.updateAttendees.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.state = {
			meeting: {},
			markdown_text: 'Enter *markdown* here',
			attendees: [],
			timeSlots: [],
			errors: [],
			formSubmitted: false
		}
		this._titleInput = {}
		this._locationInput = {}
	}
	updateMarkdown(text){
		this.setState({markdown_text: text, updated: true})
	}
	updateTimeSlots(newTimeSlots){
		this.setState({timeSlots:newTimeSlots, updated: true})
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
		if (this.state.timeSlots.length === 0){
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
			const data = {
				"hostId": "1234567891234",
				"meetingName": this._titleInput.value,
				"hostAvailability": this.state.timeSlots.map(a=>({start: a.start.toString(), end: a.end.toString()})),
				"meetingLocation": this._locationInput.value,
				"attendees": this.state.attendees.map(a=>({ id: a.id, name: a.name }))
			}
			console.log("Sending Data")
			console.log(data)
			const _this = this
			axios({
				method: 'post',
				url: `https://localhost:3000/${this.accountID}/${this.state.meeting.meetingId}/create`,
				data: data,
				withCredentials: true
			})
			.then(function (response) {
			    console.log(response);
			    _this.props.ctrl.dashboard.call();
			})
			.catch(function (error) {
			    console.log(error);
			})
		}
	}
	componentDidMount(){
		this._titleInput.focus()
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
			url: `https://meeting-scheduler.azurewebsites.net/${context.project.id}/${this.props.meetingId}/get`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({meeting: response.data[0].meeting, loading: false, attendees: response.data[0].meeting.attendees});
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	getInitials(fullName) {
		let names = fullName.split(" ");
		let initials = "";
		names.forEach(name => initials += name.charAt(0));
		return initials;
	}
	render(){
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
		let content
		if (this.state.loading) {
			content = (
				<div className="loading-container">
					<LoadingImage />
					<span>Loading Content...</span>
				</div>
			)
		} else {
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
								value={this.state.meeting.meetingName}
								onChange={()=>this.state.formSubmitted ? this.validateInput() : ""}/>
						</section>

						<section>
							<h3>Location</h3>
							<input
								ref={x=>this._locationInput = x}
								type="text"
								placeholder="Enter meeting location"
								value={this.state.meetingLocation}
								onChange={()=>this.state.formSubmitted ? this.validateInput() : ""}/>
						</section>

						<section>
							<h3>Agenda</h3>
							<MarkdownEditor
								oldValue={this.state.meeting.agenda}
								update={this.updateMarkdown}/>
						</section>

						{ availability }

						<section>
							<h3>Attendees</h3>
							<AutosuggestUser
								originalData={this.props.teamMembers}
								oldValue={this.state.meeting.attendees}
								update={this.updateAttendees}/>
						</section>
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