import React, { Component } from "react"
import Invitations from './invitations.js'
import AllMeetings from './all-meetings.js'

class Dashboard extends Component {
	constructor(props){
		super(props)
		this.meetings = [
			{
				"id"			: "1",
				"name"			: "Plan Client Presentation",
				"time"			: "2017-02-15T14:30:00+00:00",
				"description"	: "Example description",
				"location"		: "MPEB 6.21, UCL",
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
		]
		this.invitations = [
			{
				"id"			: "1",
				"name"			: "Plan Client Presentation",
				"time"			: "2017-02-15T14:30:00+00:00",
				"description"	: "Example description",
				"location"		: "MPEB 6.21, UCL",
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
	}
	render(){
		return (
			<div className="main-container">
				<AllMeetings meetings={this.meetings}
							ctrl={this.props.ctrl} />
				<Invitations invitations={this.invitations}
							ctrl={this.props.ctrl} />
			</div>
			)
	}
}

export default Dashboard