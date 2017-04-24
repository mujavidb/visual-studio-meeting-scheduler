import React, { Component } from 'react'
import moment from 'moment'
import { formatToLongTime } from '../helpers/format-time'
import { generateRGBColor } from '../helpers/color-generator'
import { getInitials } from '../helpers/get-initials'

const Meeting = props => {
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
						.map(attendee => {
							const user = props.teamMembers.find(teamMember => attendee.id === teamMember.id)
							const classes = `attendee_block ${attendee.response === 0 ? "unresponsive" : "responsive"}`
							const blockTitle = `${attendee.name} has ${attendee.response === 0 ? "not yet " : ""}responded`
							return (
								<div
									key={attendee.id}
									id={attendee.id}
									className={classes}
									title={blockTitle}
									style={{
											backgroundImage: `url(${user.imageUrl})`,
											backgroundSize: "cover",
										}}>
								</div>)

						})
					}
				</div>
			</div>
		</a>
		)
}

export default Meeting