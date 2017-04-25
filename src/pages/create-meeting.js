import React, { Component } from "react"
import CreateCalendar from '../components/create-calendar'
import AutosuggestUser from '../components/autosuggest-user'
import MarkdownEditor from '../components/markdown-editor'
import axios from 'axios'
import moment from 'moment'

export default class CreateMeeting extends Component {
	constructor(props){
		super(props)
		this.updateMarkdown = this.updateMarkdown.bind(this)
		this.updateTimeSlots = this.updateTimeSlots.bind(this)
		this.updateAttendees = this.updateAttendees.bind(this)
		this.updateTeamMembers = this.updateTeamMembers.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.state = {
			markdown_text: 'Enter *markdown* here',
			attendees: [],
			timeSlots: [],
			errors: [],
			teamMembers: [],
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
	updateTeamMembers(teamMembers){
		this.setState({teamMembers: teamMembers})
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
		if (this.state.timeSlots.length === 1){
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
			let context = VSS.getWebContext();
			const data = {
				"hostId": context.user.id,
				"meetingName": this._titleInput.value,
				"hostAvailability": this.state.timeSlots.map(a=>({dateStart: moment(a.start).toISOString(), dateEnd: moment(a.end).toISOString()})),
				"meetingLocation": this._locationInput.value,
				"attendees": this.state.attendees.map(a=>({ id: a.id, name: a.name })),
				"agenda": this.state.markdown_text
			}
			const _this = this
			axios({
				method: 'post',
				url: `https://meeting-scheduler.azurewebsites.net/${context.account.id}/meeting/create`,
				data: data,
				withCredentials: true
			})
			.then(function (response) {
			    _this.props.ctrl.dashboard.call();
			})
			.catch(function (error) {
			    console.log(error);
			});
		}
	}
	componentDidMount(){
		this._titleInput.focus();
	}
	componentDidUpdate(){
		if (this.state.formSubmitted && this.state.updated) {
			this.validateInput()
		}
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
		let autosuggest
		if(this.props.teamMembers.length == 0) {
			autosuggest = (<p>Loading...</p>);
		} else {
			autosuggest = (
					<AutosuggestUser
						originalData={this.props.teamMembers}
						update={this.updateAttendees}/>
			);
		}
		let nonVotableWarning
		if(this.state.timeSlots.length == 1) {
			nonVotableWarning = (
				<p>You have only selected one time slot. This will mean that the time of the meeting will not be votable.</p>
			)
		} else {
			nonVotableWarning = null
		}
		return (
				<div className="large_card_area create_meeting">
					<header>
						<div className="topbar">
							<h2 className="container_title">Create a Meeting</h2>
						</div>
					</header>
					<main>
						<section>
							<h3>Title</h3>
							<input
								ref={x=>this._titleInput = x}
								type="text"
								placeholder="Enter meeting title"
								onChange={()=>this.state.formSubmitted ? this.validateInput() : ""}/>
						</section>

						<section>
							<h3>Location</h3>
							<input
								ref={x=>this._locationInput = x}
								type="text"
								placeholder="Enter meeting location"
								onChange={()=>this.state.formSubmitted ? this.validateInput() : ""}/>
						</section>

						<section>
							<h3>Agenda</h3>
							<MarkdownEditor
								update={this.updateMarkdown}/>
						</section>

						<section>
							<h3>Availability</h3>
							<CreateCalendar
								onChangeTimeSlots={this.updateTimeSlots}/>
							{ nonVotableWarning }
						</section>

						<section>
							<h3>Attendees</h3>
							{ autosuggest }

						</section>
						{ errors }
						<footer>
							<button onClick={this.props.ctrl.dashboard} className="button cancel maxed">Cancel</button>
							<button onClick={this.onSubmit} className="button primary maxed">Create Meeting</button>
						</footer>
					</main>
				</div>
			)
	}
}