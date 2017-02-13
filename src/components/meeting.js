import React, { Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'

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
				<Link to={"/view-meeting/" + this.props.details.id} onClick={this.updateViewMeeting} className="meeting_card_container" role="button">
					<div className="meeting_card">
						<h3 className="meeting_title">{ this.props.details.name }</h3>
						<p className="meeting_datetime">{ this.props.details.time ? moment(this.props.details.time).format("dddd Do MMMM HH:mm") : "Time TBC"}</p>
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
// Would be helpful to re-use the time formatting code above somehow

export default Meeting