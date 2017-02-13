import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'

class ViewMeeting extends Component {
	constructor(props){
		super(props)
		console.log("Checking props in ViewMeeting")
		console.log(this.context)
		this.meeting = this.props.route.currentMeeting
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
							<span className="label">{ this.meeting.time }</span>
						</div>

						<div id="time">
							<h3>Availability</h3>
							<span className="label">Highlight the areas where you would like the meeting time to fall within.</span>
						</div>

						<h3>Attendees</h3>
						<div className="attendee_area">
							<div className="attendee_added">
								<div className="attendees">
									<div className="attendee_block">
										<span className="attendee_initials">MB</span>
										<a href="#" className="remove">&#10799;</a>
									</div>
									<div className="attendee_block">
										<span className="attendee_initials">AH</span>
										<a href="#" className="remove">&#10799;</a>

									</div>
									<div className="attendee_block">
										<span className="attendee_initials">KC</span>
										<a href="#" className="remove">&#10799;</a>
									</div>
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