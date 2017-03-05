import React, { Component } from 'react'
import moment from 'moment'
import { formatToLongTime } from '../helpers/format-time.js'

const Invitation = props => {
	return (
		//TODO: Route this to seperate invitation view
		<a className="meeting_card_container" role="button" onClick={()=>props.ctrl.viewMeeting(props.details.id)}>
			<div className="meeting_card">
				<h3 className="meeting_title">{ props.details.name }</h3>
				<p className="meeting_datetime">{ formatToLongTime(props.details.time) }</p>
				<p className="meeting_location">{ props.details.location }</p>
				<div className="attendees">
					{
						props
						.details
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
		</a>
		)
}

export default Invitation