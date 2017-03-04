import React, { Component } from 'react'
import moment from 'moment'
import { generateRGBColor } from '../helpers/color-generator'

//API: pull event details
//API: check if user has permission
//API: pull all attendee details

class RespondInvitation extends Component {
	constructor(props){
		super(props)
		// In the final implementation, you would do a GET request
		// 		to get the element with the ID === props.params.id
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
		this.invitation = this.invitations[0]
		console.log(this.invitation);
	}
	render(){
		return (
				<div className="large_card_area single_meeting">
					<header>
						<div className="topbar">
							<h2 className="container_title">{ this.invitation.name }</h2>
						</div>
					</header>
					<main>
						<h3>Description</h3>
						<span className="label">{ this.invitation.description }</span>

						<h3>Agenda</h3>
						<div className="agenda_area">
							<div className="markdown_preview_area">
								<div className="markdown_preview">
									{ this.invitation.agenda }
								</div>
							</div>
						</div>

						<h3>Minutes</h3>
						<div className="agenda_area">
							<div className="markdown_preview_area">
								<div className="markdown_preview">
									{ this.invitation.minutes }
								</div>
							</div>
						</div>

						<h3>Time</h3>
						<span className="label">{ this.invitation.time ? moment(this.invitation.time).format("dddd Do MMMM HH:mm") : "Time TBC" }</span>

						<h3>Availability</h3>
						<span className="label">Highlight the areas where you would like the meeting time to fall within.</span>

						<h3>Attendees</h3>
						<div className="attendee_area">
							<div className="attendee_added">
								<div className="attendees">
									{
										this
										.invitation
										.attendees
										.filter(attendee => attendee.status == true)
										.map(attendee =>
											<div className="attendee_block" key={attendee.id} style={{backgroundColor: generateRGBColor(attendee.initials)}}>
												<span className="attendee_initials">{attendee.initials}</span>
											</div>
										)
									}
								</div>
							</div>
						</div>
						<footer>
							<a onClick={()=>this.props.ctrl.dashboard()} className="button cancel maxed" role="button">Back</a>
						</footer>
					</main>
				</div>
			)
	}
}

export default RespondInvitation