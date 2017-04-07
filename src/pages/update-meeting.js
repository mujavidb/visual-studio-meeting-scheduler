import React, { Component } from "react"
import CreateCalendar from '../components/create-calendar'
import AutosuggestUser from '../components/autosuggest-user'
import MarkdownEditor from '../components/markdown-editor'
import axios from 'axios'

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
				"hostAvailability": this.state.timeSlots.map(a=>({start: a.start.toString(), end: a.end.toString()})),
				"meetingLocation": this._locationInput.value,
				"attendees": this.state.attendees.map(a=>({ id: a.id, name: a.name }))
			}
			console.log("Sending Data")
			console.log(data)
			const _this = this
			axios({
				method: 'post',
				url: `http://localhost:3000/${this.accountID}/meeting/create`,
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
		console.log("GET MEETING");
		let _this = this;
		axios({
			method: 'get',
			url: `http://localhost:3000/funfun123123/${this.props.meetingId}/get`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({meeting: response.data[0].meeting, loading: false});
			console.log("RESPONSE", response);
			console.log("GOT MEETING");
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
								value={this.state.meeting}
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
							<button onClick={this.onSubmit} className="button primary maxed">Update</button>
						</footer>
					</main>
				</div>
			)
	}
}