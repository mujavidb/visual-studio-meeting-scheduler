import React, { Component } from "react"
import fullcalendar from 'fullcalendar'
import Calendar from './calendar.js'
import { formatMarkdown } from '../helpers/format-markdown.js'

export default class CreateMeeting extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {value: 'Enter *markdown* here'}
	}

	handleChange(event) {
		this.setState({value: event.target.value});
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
						<div className="agenda_area">
							<div className="markdown_input">
								<span className="label">Markdown Editor</span>
								<textarea name="agenda" onChange={this.handleChange} ref="textarea" defaultValue={this.state.value}></textarea>
							</div>
							<div className="markdown_preview_area">
								<span className="label">Text Preview</span>
								<div className="markdown_preview" dangerouslySetInnerHTML={formatMarkdown(this.state.value)}></div>
							</div>
						</div>

						<h3>Availability</h3>
						<span className="label">Highlight the areas where you would like the meeting time to fall within.</span>
						<div className="full_calendar_area">
							<Calendar />
						</div>

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
						<a onClick={()=>this.props.ctrl.dashboard()} className="button primary maxed" role="button">Create Meeting</a>
					</main>
				</div>
			)
	}
}