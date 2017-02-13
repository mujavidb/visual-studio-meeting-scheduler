import React, { Component } from 'react'
import { Link } from 'react-router'

class Meeting extends Component {
	constructor(props){
		super(props)
		this.updateViewMeeting = this.updateViewMeeting.bind(this)
	}
	updateViewMeeting(){
		console.log("YEAH")
		this.props.ctrl.currentMeeting = this.props.details
	}
	render(){
		return (
				<Link to="/view-meeting" onClick={this.updateViewMeeting} className="meeting_card_container" role="button">
					<div className="meeting_card">
						<h3 className="meeting_title">{ this.props.details.name }</h3>
						<p className="meeting_datetime">{ this.props.details.time}</p>
						<p className="meeting_location">{ this.props.details.location }</p>
						<div className="attendees">
							<div className="attendee_block">
								<span className="attendee_initials">MB</span>
							</div>
							<div className="attendee_block">
								<span className="attendee_initials">AH</span>
							</div>
							<div className="attendee_block">
								<span className="attendee_initials">KC</span>
							</div>
						</div>
					</div>
				</Link>
			)
	}
}

export default Meeting