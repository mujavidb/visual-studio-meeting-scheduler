import React, { Component } from "react"
import { Link } from 'react-router'
import fullcalendar from 'fullcalendar'

export default class CreateMeeting extends Component {
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
						<div className="agenda_area">
							<div className="markdown_input">
								<span className="label">Markdown Editor</span>
								<textarea name="agenda" placeholder="Enter markdown here"></textarea>
							</div>
							<div className="markdown_preview_area">
								<span className="label">Text Preview</span>
								<div className="markdown_preview">
									
								</div>
							</div>
						</div>

						<h3>Availability</h3>
						<span className="label">Highlight the areas where you would like the meeting time to fall within.</span>
						<div className="full_calendar_area"></div>

						<h3>Attendees</h3>
						<div className="attendee_area">
							<div className="attendee_input">
								<span className="label">Add attendees to this meeting.</span>
								<input type="text" name="title" placeholder="Enter attendee's names" />
							</div>
							<div className="attendee_added">
								<span className="label">Click to remove</span>
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
						<Link to="/" className="button primary maxed">Create Meeting</Link>
					</main>
				</div>
			)
	}
}