import React, { Component } from 'react'
import Invitation from './invitation.js'

const Invitations = props => {
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
					{ props.invitations.map( item => <Invitation key={item.id} details={item} />) }
				</main>
			</div>
		)
}

export default Invitations