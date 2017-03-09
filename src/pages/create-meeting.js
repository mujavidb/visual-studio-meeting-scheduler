import React, { Component } from "react"
import CreateCalendar from '../components/create-calendar'
import AutosuggestUser from '../components/autosuggest-user'
import MarkdownEditor from '../components/markdown-editor'
import axios from 'axios'

//API: OAuth
//API: get user id
//API: get users in project
//API: Send all users

//FIX: Autosuggest on click
//FIX: Autosuggest on type, hide irrelevant

export default class CreateMeeting extends Component {
	constructor(props){
		super(props)
		this.updateMarkdown = this.updateMarkdown.bind(this)
		this.updateTimeSlots = this.updateTimeSlots.bind(this)
		this.updateAttendees = this.updateAttendees.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.state = {
			markdown_text: 'Enter *markdown* here',
			attendees: [],
			timeSlots: [],
			errors: [],
			formSubmitted: false
		}
		this.accountID = "funfun123123"
		this.userID = "lovebug321321"
		this._titleInput = {}
		this._locationInput = {}

		//mocks form received in
		this.query_results = [
			{ initials: "MB", id: "najd38j9h", name: "Mujavid Bukhari"},
			{ initials: "AL", id: "kjsadlj23", name: "Alasdair Hall"},
			{ initials: "KC", id: "mjniojin2", name: "Kelvin Chan"},
			{ initials: "ES", id: "9jn9n34f9", name: "Eric Schmidt"},
			{ initials: "FP", id: "mlksandhg", name: "Faiz Punakkath"},
			{ initials: "YM", id: "934i029jd", name: "Yousef Mahmood"}
		]
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
				"hostAvailability": [this.state.timeSlots.map(a=>({start: a.start.toLocaleString(), end: a.end.toLocaleString()}))],
				"attendees": [this.state.attendees.map(a=>({ id: a.id, name: a.name }))]
			}
			console.log("Sending Data")
			console.log(data)
			// const request = new XMLHttpRequest()
			// request.open('POST', `http://localhost:3000/meeting/get/${this.props.userID}`, true)
			// request.setRequestHeader("Content-Type", "application/json")
			// request.onreadystatechange = () => {
			// 	if (request.readystate === XMLHttpRequest.DONE){
			// 		if (request.status == 200) {

			// 		} else {
			// 			console.log("Oops, there's a problemo")
			// 		}
			// 	}
			// }
			// request.send(data)
			//
			axios({
				method: 'post',
				url: `http://localhost:3000/${this.accountID}/meeting/create`,
				data: data,
				withCredentials: true
			})
			.then(function (response) {
			    console.log(response);
			})
			.catch(function (error) {
			    console.log(error);
			});
		}
	}
	componentDidMount(){
		this._titleInput.focus()
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
						</section>

						<section>
							<h3>Attendees</h3>
							<AutosuggestUser
								originalData={this.query_results}
								update={this.updateAttendees}/>
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