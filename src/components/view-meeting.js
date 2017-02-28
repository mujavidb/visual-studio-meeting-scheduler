import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import moment from 'moment'

class ViewMeeting extends Component {
	constructor(props){
		super(props)
		// In the final implementation, you would do a GET request 
		// 		to get the element with the ID === props.params.id
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
				"id"			: "2",
				"name"			: "Weekly Standup",
				"time"			: "",
				"description"	: "Example description",
				"location"		: "Break room",
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
		this.meeting = this.meetings.find((item) =>	item.id === props.params.id)
	}
	render(){
		return (
				<div className="large_card_area single_meeting">
					<header>
						<div className="topbar">
							<h2 className="container_title">{ this.meeting.name }</h2>
						</div>
					</header>
					<main>
						<h3>Description</h3>
						<span className="label">{ this.meeting.description }</span>
						
						<h3>Agenda</h3>
						<div className="agenda_area">
							<div className="markdown_preview_area">
								<div className="markdown_preview">
									{ this.meeting.agenda }
								</div>
							</div>
						</div>

						<div id="minutes">
						<h3>Minutes</h3>
						<div className="agenda_area">
							<div className="markdown_preview_area">
								<div className="markdown_preview">
									{ this.meeting.minutes }
								</div>
							</div>
						</div>
						</div>

						<div id="time">
							<h3>Time</h3>
							<span className="label">{ this.meeting.time ? moment(this.meeting.time).format("dddd Do MMMM HH:mm") : "Time TBC" }</span>
						</div>

						<div id="time">
							<h3>Availability</h3>
							<span className="label">Highlight the areas where you would like the meeting time to fall within.</span>
						</div>

						<h3>Attendees</h3>
						<div className="attendee_area">
							<div className="attendee_added">
								<div className="attendees">
									{
										this
										.meeting
										.attendees
										.filter(attendee => attendee.status == true)
										.map(item => 
											<div className="attendee_block" key={item.id}>
												<span className="attendee_initials">{item.initials}</span>
											</div>
										)
									}
								</div>
							</div>
						</div>
						<Link to="/" className="button primary maxed">Done</Link>
					</main>
				</div>
			)
	}
}

export default withRouter(ViewMeeting)