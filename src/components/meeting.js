import React, { Component } from 'react'
import moment from 'moment'
import { formatToLongTime } from '../helpers/format-time'
import { generateRGBColor } from '../helpers/color-generator'
import { getInitials } from '../helpers/get-initials'

const Meeting = props => {
	console.log("Meeting props.teamMembers:", props.teamMembers);
	return (
		<a onClick={()=>props.ctrl.viewMeeting(props.details.meetingId)} className="meeting_card_container" role="button">
			<div className="meeting_card">
				<h3 className="meeting_title">{ props.details.meetingName }</h3>
				<p className="meeting_datetime">{ formatToLongTime(props.details.finalDate) }</p>
				<p className="meeting_location">{ props.details.meetingLocation }</p>
				<div className="attendees">
					{
						props
						.details
						.attendees
						.sort((a,b)=> a === true ? 0 : 1)
						.map(attendee => {
							const classes = `attendee_block ${attendee.status == "" ? "unresponsive" : "responsive"}`
							const blockTitle = `${attendee.name} has ${attendee.status == "" ? "not yet " : ""}responded`
							if(props.teamMembers.length == 0) {
								return (
									<div
										key={attendee.id}
										className={classes}
										title={blockTitle}
										style={{backgroundColor: generateRGBColor(getInitials(attendee.name))}} >
										<span className="attendee_initials">{getInitials(attendee.name)}</span>
									</div>
								)
							} else {
								const user = props.teamMembers.find(teamMember => attendee.id === teamMember.id)
								return (
									<img key={attendee.id} src={user.imageUrl} alt={blockTitle} />
								)
							}
							
						})
					}
				</div>
			</div>
		</a>
		)
}

export default Meeting