import React, { Component } from 'react'
import moment from 'moment'
import { generateRGBColor } from '../helpers/color-generator'
import MarkdownRenderer from '../components/markdown-renderer'
import { formatToLongTime } from '../helpers/format-time'

//API: pull event details
//API: check if user has permission
//API: pull all attendee details

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
						"status"		: false,
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
		this.meeting = this.meetings.find(item => item.id === this.props.id)
	}
	render(){
		const meetingTime = this.meeting.time ? moment(this.meeting.time).format("ddd Do MMM, h:mma") : "Time TBC"
		const meetingTimeTitle = this.meeting.time ? moment(this.meeting.time).format("dddd Do MMMM YYYY, h:mma") : "Time TBC"
		const minutes = this.meeting.minutes == "" ? ""
												   : (
													<section>
														<h3>Minutes</h3>
														<MarkdownRenderer
															content={this.meeting.minutes}/>
													</section>
												   )
		return (
				<div className="large_card_area single_meeting">
					<header>
						<div className="topbar">
							<h2 className="container_title">{ this.meeting.name }</h2>
							<h2 className="container_date" title={meetingTimeTitle}>{ meetingTime }</h2>
						</div>
					</header>
					<main>

						<section>
							<h3>Agenda</h3>
							<MarkdownRenderer
								content={this.meeting.agenda}/>
						</section>

						{ minutes }

						<section>
							<h3>Attendees</h3>
							<div className="attendee_area">
								<div className="attendee_added">
									<div className="attendees">
										{
											this
											.meeting
											.attendees
											.sort((a,b)=> a === true ? 0 : 1)
											.map(attendee => {
												const classes = `attendee_block ${attendee.status == "" ? "unresponsive" : "responsive"}`
												const blockTitle = `${attendee.initials} has ${attendee.status == "" ? "not yet" : ""} responded`
												return (
													<div
														key={attendee.id}
														className={classes}
														title={blockTitle}
														style={{backgroundColor: generateRGBColor(attendee.initials)}} >
														<span className="attendee_initials">{attendee.initials}</span>
													</div>
												)
											})
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

export default ViewMeeting