import React, { Component } from 'react'
import moment from 'moment'
import { generateRGBColor } from '../helpers/color-generator'
import RespondCalendar from '../components/respond-calendar'

//API: pull event details
//API: check if user has permission
//API: pull all attendee details

class RespondInvitation extends Component {
	constructor(props){
		super(props)
		this.updateSelectedTimeSlots = this.updateSelectedTimeSlots.bind(this)
		this.state = {
			selected: []
		}
		this.invitations = [
			{
				"id"			: "1",
				"name"			: "Plan Client Presentation",
				"time"			: "2017-02-15T14:30:00+00:00",
				"description"	: "Example description",
				"location"		: "MPEB 6.21, UCL",
				"minutes"		: "This is what we talked about",
				"agenda"		: "This is what we will talk about",
				"timeSlots"		: [
					{
						start: "Wed Mar 08 2017 08:30:00 GMT+0000",
						end: "Wed Mar 08 2017 10:00:00 GMT+0000"
					}
				],
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
	}
	updateSelectedTimeSlots(updatedSlots){
		this.setState({selected: updatedSlots})
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

					<section>
						<h3>Agenda</h3>
						<div className="agenda_area">
							<div className="markdown_preview_area">
								<div className="markdown_preview">
									{ this.invitation.agenda }
								</div>
							</div>
						</div>
					</section>

					<section>
						<h3>Availability</h3>
						<RespondCalendar
							onSelectTimeSlots={this.updateSelectedTimeSlots}
							timeSlots={this.invitation.timeSlots}
							ctrl={this.props.ctrl} />
					</section>


					<section>
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
					</section>

					<footer>
						<a onClick={()=>this.props.ctrl.dashboard()} className="button cancel maxed" role="button">Back</a>
					</footer>
				</main>
			</div>
			)
	}
}

export default RespondInvitation