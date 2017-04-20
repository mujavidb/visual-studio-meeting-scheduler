import React, { Component } from 'react'
import moment from 'moment'
import { formatToLongTime } from '../helpers/format-time'
import { generateRGBColor } from '../helpers/color-generator'
import { getInitials } from '../helpers/get-initials'

const HostedMeeting = props => {
	console.log(props);
	return (
		<a className="meeting_card_container" role="button" onClick={()=>props.ctrl.viewHosted(props.details.meetingId)}>
			<div className="meeting_card">
				<h3 className="meeting_title">{ props.details.meetingName }</h3>
				<p className="meeting_datetime">{ formatToLongTime(props.details.time) }</p>
				<p className="meeting_location">{ props.details.meetingLocation }</p>
				<div className="attendees">
					{
						props
						.teamMembers
						.sort((a,b)=> a === true ? 0 : 1)
						.map(attendee => {
							const classes = `attendee_block ${attendee.status == "" ? "unresponsive" : "responsive"}`
							const blockTitle = `${attendee.displayName} has ${attendee.status == "" ? "not yet " : ""}responded`
							return (
								<div
									key={attendee.id}
									id={attendee.id}
									className={classes}
									title={blockTitle}
									style={{
											backgroundImage: `url(${attendee.imageUrl})`,
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

export default HostedMeeting