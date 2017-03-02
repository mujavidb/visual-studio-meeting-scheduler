import React, { Component } from 'react'
import Invitation from './invitation.js'

const Invitations = props => {
	const allInvitations = props.invitations
	let content
	if (allInvitations.length > 0) {
		content = allInvitations.map( item => <Invitation key={item.id} details={item} ctrl={props.ctrl}/>)
	} else {
		content = (
			<div className="empty_state_card">
				"You currently have no invitations."
			</div>
		)
	}
	return (
		<div className="large_card_area invitations">
			<header>
				<div className="topbar">
					<h2 className="container_title">
						Invitations&nbsp;
						<span className="badge">({props.invitations.length})</span>
					</h2>
				</div>
			</header>
			<main>
				{ props.invitations.map( item => <Invitation key={item.id} details={item} ctrl={props.ctrl}/>) }
			</main>
		</div>
		)
}

export default Invitations