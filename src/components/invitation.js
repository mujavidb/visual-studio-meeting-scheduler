import React, { Component } from 'react'
import moment from 'moment'
import { formatToLongTime } from '../helpers/format-time'
import { generateRGBColor } from '../helpers/color-generator'

const Invitation = props => {
	return (
		//TODO: Route this to seperate invitation view
		<a className="meeting_card_container" role="button" onClick={()=>props.ctrl.respondInvitation(props.details.id)}>
			<div className="meeting_card">
				<h3 className="meeting_title">{ props.details.name }</h3>
				<p className="meeting_datetime">{ formatToLongTime(props.details.time) }</p>
				<p className="meeting_location">{ props.details.location }</p>
				<div className="attendees">
					{
						props
						.details
						.attendees
						.sort((a,b)=> a === true ? 0 : 1)
						.map(attendee => {
							const classes = `attendee_block ${attendee.status == "" ? "unresponsive" : "responsive"}`
							const blockTitle = `${attendee.initials} has ${attendee.status == "" ? "not yet" : ""} responded`
							return (
								<div
									key={attendee.id}
									className={classes}
									title={blockTitle}
									style={{backgroundColor: generateRGBColor(attendee.initials)}} >
									<span className="attendee_initials">{attendee.initials}</span>
								</div>
							)
						})
					}
				</div>
			</div>
		</a>
		)
}

export default Invitation