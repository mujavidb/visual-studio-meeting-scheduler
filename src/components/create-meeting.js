import React, { Component } from "react"
import Calendar from './calendar'
import AutosuggestUser from './autosuggest-user'
import MarkdownEditor from './markdown-editor'

//API: OAuth
//API: get user id
//API: get users in project
//API: Send all users

export default class CreateMeeting extends Component {
	constructor(props){
		super(props)
		this.updateMarkdown = this.updateMarkdown.bind(this)
		this.onChangeTimeSlots = this.onChangeTimeSlots.bind(this)
		this.updateAttendees = this.updateAttendees.bind(this)
		this.state = {
			markdown_text: 'Enter *markdown* here',
			attendees: [],
			timeSlots: []
		}
		//mocks form received in
		this.query_results = [
			{ initials: "MB", id: "najd38j9h", name: "Mujavid Bukhari"},
			{ initials: "AL", id: "kjsadlj23", name: "Alasdair Hall"},
			{ initials: "KC", id: "mjniojin2", name: "Kelvin Chan"},
			{ initials: "ES", id: "9jn9n34f9", name: "Eric Schmidt"},
			{ initials: "FP", id: "mlksandhg", name: "Faiz Punakkath"},
			{ initials: "YM", id: "934i029jd", name: "Yousef Mahmood"}
		]
		//mocks form passed to selector
		this.suggestions = this.query_results.map(a => { return { id: a.id, name: a.name } })
	}
	updateMarkdown(text){
		this.setState({markdown_text: text})
	}
	// NEED TO GET ARRAY OF EVENTS DIRECT FROM FULL CALENDAR
	onChangeTimeSlots(newTimeSlots){
		this.setState({timeSlots:newTimeSlots})
		console.log(this.state.timeSlots)
	}
	updateAttendees(attendees){
		this.setState({attendees: attendees})
	}
	render(){
		return (
				<div className="large_card_area create_meeting">
					<header>
						<div className="topbar">
							<h2 className="container_title">Create a Meeting</h2>
						</div>
					</header>
					<main>
						<h3>Title</h3>
						<input type="text" name="title" placeholder="Enter meeting title" />

						<h3>Agenda</h3>
						<MarkdownEditor
							update={this.updateMarkdown}/>

						<h3>Availability</h3>
						<Calendar
							onChangeTimeSlots={this.onChangeTimeSlots} />

						<h3>Attendees</h3>
						<AutosuggestUser
							originalData={this.query_results}
							suggestions={this.suggestions}
							update={this.updateAttendees}/>

						<footer>
							<a onClick={()=>this.props.ctrl.dashboard()} className="button cancel maxed" role="button">Cancel</a>
							<a onClick={()=>this.props.ctrl.dashboard()} className="button primary maxed" role="button">Create Meeting</a>
						</footer>
					</main>
				</div>
			)
	}
}