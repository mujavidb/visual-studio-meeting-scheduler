import React, { Component } from 'react'
import Invitation from './invitation.js'

const Invitations = props => {
	let content
	if (props.invitations.length > 0) {
		content = props.invitations.map( item => <Invitation key={item.id} details={item} ctrl={props.ctrl}/>)
	} else {
		content = (
			<div className="empty_state_card">
				You have no meeting invitations
			</div>
		)
	}
	return (
		<div className="large_card_area invitations">
			<header>
				<div className="topbar">
					<h2 className="container_title">
						Invitations
					</h2>
				</div>
			</header>
			<main>
				{ content }
			</main>
		</div>
		)
}

export default Invitations