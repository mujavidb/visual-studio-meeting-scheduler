import React, { Component } from 'react'
import { Link } from 'react-router'
import Meeting from './meeting.js'

class AllMeetings extends Component {
	constructor(props){
		super(props)
		this.state = {
			isPast: false
		}
		this.toggleMeetings = this.toggleMeetings.bind(this);
	}
	toggleMeetings(goToPast){
		this.setState({isPast: goToPast})
	}
	render(){
		const meetingsClasses = "large_card_area all_meetings" + (this.state.isPast ? " past" : "")
		return (
			<div className={meetingsClasses}>
				<header>
					<div className="topbar">
						<h2 className="container_title">
							All Meetings&nbsp;
							<span className="badge">({this.props.meetings.length})</span>
						</h2>
						<Link to="/create-meeting" className="button primary">Create Meeting</Link>
					</div>
					<div className="content_filters">
						<a className="upcoming_button" onClick={()=>this.toggleMeetings(false)} role="button">Upcoming</a>
						<a className="past_button" onClick={()=>this.toggleMeetings(true)} role="button">Past</a>
					</div>
				</header>
				<main>
					<div className="upcoming">
						{this.props.meetings.map(item => <Meeting key={item.id} details={item} ctrl={this.props.ctrl}/>)}
					</div>
					<div className="past">
						{this.props.meetings.map(item => <Meeting key={item.id} details={item} ctrl={this.props.ctrl}/>)}
					</div>
				</main>
			</div>
			)
	}
}

export default AllMeetings