import React, { Component } from 'react'
import moment from 'moment'
import { formatToLongTime } from '../helpers/format-time'
import { generateRGBColor } from '../helpers/color-generator'

const Meeting = props => {
	return (
		<a onClick={()=>props.ctrl.viewMeeting(props.details.meetingId)} className="meeting_card_container" role="button">
			<div className="meeting_card">
				<h3 className="meeting_title">{ props.details.meetingName }</h3>
				<p className="meeting_datetime">{ formatToLongTime(props.details.time) }</p>
				<p className="meeting_location">{ props.details.meetingLocation }</p>
				<div className="attendees">
					{
						props
						.details
						.attendees
						.sort((a,b)=> a === true ? 0 : 1)
						.map(attendee => {
							const classes = `attendee_block ${attendee.status == "" ? "unresponsive" : "responsive"}`
							const blockTitle = `${getInitials(attendee.name)} has ${attendee.status == "" ? "not yet" : ""} responded`
							return (
								<div
									key={attendee.id}
									className={classes}
									title={blockTitle}
									style={{backgroundColor: generateRGBColor(getInitials(attendee.name))}} >
									<span className="attendee_initials">{getInitials(attendee.name)}</span>
								</div>
							)
						})
					}
				</div>
			</div>
		</a>
		)
}

var getInitials = function(fullName) {
	let names = fullName.split(" ");
	let initials = "";
	names.forEach(name => initials += name.charAt(0));
	return initials;
}

export default Meeting