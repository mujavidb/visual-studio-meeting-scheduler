import React, { Component } from 'react'
import moment from 'moment'
import { formatToLongTime } from '../helpers/format-time'
import { generateRGBColor } from '../helpers/color-generator'
import { getInitials } from '../helpers/get-initials'

const Invitation = props => {
	console.log(props);
	return (
		//TODO: Route this to seperate invitation view
		<a className="meeting_card_container" role="button" onClick={()=>props.ctrl.respondInvitation(props.details.meetingId)}>
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
							const user = props.teamMembers.find(teamMember => attendee.id === teamMember.id)
							const classes = `attendee_block ${attendee.status == "" ? "unresponsive" : "responsive"}`
							const blockTitle = `${attendee.displayName} has ${attendee.status == "" ? "not yet " : ""}responded`
							return (
								<div
									key={user.id}
									id={user.id}
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

export default Invitation