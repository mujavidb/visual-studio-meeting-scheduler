import React, { Component } from 'react'

const Invitation = props => {
	return (
			<a href="single-meeting" className="meeting_card_container" role="button">
				<div className="meeting_card">
					<h3 className="meeting_title">{ props.details.name }</h3>
					<p className="meeting_datetime">{ props.details.time }</p>
					<p className="meeting_location">{ props.details.location }</p>
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
			</a>
		)
}

export default Invitation