import React, { Component } from 'react'
import HostedMeeting from '../components/hosted-meeting'

const HostedMeetings = props => {
	let content
	if (props.meetings.length > 0) {
		content = props.meetings.map( item => <HostedMeeting key={item.meetingId} details={item} ctrl={props.ctrl} teamMembers={props.teamMembers}/>)
	} else {
		content = (
			<div className="empty_state_card">
				You do not have any hosted meetings
			</div>
		)
	}
	return (
		<div className="large_card_area hosted_meetings">
			<header>
				<div className="topbar">
					<h2 className="container_title">
						My Hosted Meetings
					</h2>
				</div>
			</header>
			<main>
				{ content }
			</main>
		</div>
		)
}

export default HostedMeetings