import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import moment from 'moment'
import { formatToLongTime } from '../helpers/format-time.js'

class Meeting extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
			<Link to={`/view-meeting/${this.props.details.id}`} className="meeting_card_container" role="button">
				<div className="meeting_card">
					<h3 className="meeting_title">{ this.props.details.name }</h3>
					<p className="meeting_datetime">{ formatToLongTime(this.props.details.time) }</p>
					<p className="meeting_location">{ this.props.details.location }</p>
					<div className="attendees">
						{
							this
							.props
							.details
							.attendees
							.filter(attendee => attendee.status == true)
							.map(item => 
								<div className="attendee_block" key={item.id}>
									<span className="attendee_initials">{item.initials}</span>
								</div>
							)
						}
					</div>
				</div>
			</Link>
			)
	}
}
// Would be helpful to re-use the time formatting code above somehow

export default withRouter(Meeting)