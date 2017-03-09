import React, { Component } from "react"
import Invitations from '../components/all-invitations'
import AllMeetings from '../components/all-meetings'
import LoadingImage from '../components/loading-image'
import axios from 'axios'

//API: OAuth
//API: get user id
//API: pull all events
//API: get all user details

class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			authToken: "",
			userID: "",
			meetings: [],
			loading: true
		}
	}
	componentDidMount(){
		this.verifyOAuth();
		this.getAllMeetings();
	}
	verifyOAuth(){
		//TODO: update for OAuth
		this.setState({authToken: "smoa98hjr738fqbhn98hrj4mnqr93om"})
		this.getUserID()
	}
	getUserID(){
		//TODO: update to get user id
		this.setState({userID: "womuheyifb"})
		// this.getAllEvents()
	}
	getAllMeetings(){
		console.log("Get all meetings is running");
		let that = this;
		axios({
			method: 'get',
			url: `http://localhost:3000/document/create/funfun123123`,
			withCredentials: true
		})
		.then(function (response) {
			that.setState({meetings: response.data.meetings, loading: false})
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	getAllEvents(){
		// const request = XMLHttpRequest()
		// request.open('GET', `http://localhost:3000/meeting/get/${this.state.userID}`, true)
		// request.setRequestHeader("Content-Type", "application/json")
		// request.onreadystatechange = () => {
		// 	if (request.readystate === XMLHttpRequest.DONE){
		// 		if (request.status == 200) {
		// 			this.setState({meetings: request.response.data})
		// 		} else {
		// 			console.log("Oops, there's a problemo")
		// 		}
		// 	}
		// }
		// request.send(null)
		const meetings = [
			{
				"id"			: "1",
				"name"			: "Plan Client Presentation",
				"time"			: "2017-02-15T14:30:00+00:00",
				"description"	: "Example description",
				"location"		: "MPEB 6.21, UCL",
				"status"		: true,
				"minutes"		: "This is what we talked about",
				"agenda"		: "This is what we will talk about",
				"attendees"		: [
					{
						"id"		: "394",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "KC"
					},
					{
						"id"		: "213",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "MB"
					},
					{
						"id"		: "3489",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "AH"
					}
				]
			},
			{
				"id"			: "2",
				"name"			: "Weekly Standup",
				"time"			: "",
				"description"	: "Example description",
				"location"		: "Break room",
				"status"		: true,
				"minutes"		: "This is what we talked about",
				"agenda"		: "This is what we will talk about",
				"attendees"		: [
					{
						"id"		: "3489",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "AH"
					},
					{
						"id"		: "394",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "KC"
					}
				]
			},
			{
				"id"			: "3",
				"name"			: "Sales Review",
				"time"			: "2017-02-06T15:30:00+00:00",
				"description"	: "We're going to review some sales",
				"location"		: "Board Room",
				"status"		: true,
				"minutes"		: "This is what we talked about",
				"agenda"		: "This is what we will talk about",
				"attendees"		: [
					{
						"id"		: "213",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "MB"
					},
					{
						"id"		: "3489",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "AH"
					},
					{
						"id"		: "394",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "KC"
					}
				]
			},
			{
				"id"			: "1",
				"name"			: "Plan Client Presentation",
				"time"			: "2017-02-15T14:30:00+00:00",
				"description"	: "Example description",
				"location"		: "MPEB 6.21, UCL",
				"status"		: false,
				"minutes"		: "This is what we talked about",
				"agenda"		: "This is what we will talk about",
				"attendees"		: [
					{
						"id"			: "213",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "MB"
					},
					{
						"id"			: "3489",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "AH"
					},
					{
						"id"			: "394",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "KC"
					},
					{
						"id"			: "894",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "YF"
					},
					{
						"id"			: "9694",
						"availability"	: "blah",
						"status"		: true,
						"initials"		: "EH"
					}
				]
			}
		]
		setTimeout(()=> this.setState({meetings: meetings, loading: false}), 500)
	}
	render(){
		let content
		if (this.state.loading == true) {
			content = (
				<div className="loading-container">
					<LoadingImage />
					<span>Loading Content...</span>
				</div>
			)
		} else {
			content = (
				<div className="main-container">
					<AllMeetings
						meetings={this.state.meetings.filter(a => a.status === true)}
						ctrl={this.props.ctrl} />
					<Invitations
						invitations={this.state.meetings.filter(a => a.status === false)}
						ctrl={this.props.ctrl} />
				</div>
			)
		}
		return content
	}
}

export default Dashboard