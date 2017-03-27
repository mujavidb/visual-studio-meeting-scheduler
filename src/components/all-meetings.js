import React, { Component } from 'react'
import Meeting from './meeting.js'
import moment from 'moment'

class AllMeetings extends Component {
	constructor(props){
		super(props)
		this.state = {
			isPast: this.props.isPast !== undefined ? this.props.isPast : false
		}
		this.toggleMeetings = this.toggleMeetings.bind(this);
	}
	toggleMeetings(goToPast){
		this.setState({isPast: goToPast})
	}
	filterUpcoming(isPast){
		return meeting => {
			if(!meeting.time) return !isPast;
			return moment(meeting.time).isAfter(moment()) === !isPast;
		}
	}
	getMeetingList() {
		const filteredMeetings = this.props.meetings.filter(this.filterUpcoming(this.state.isPast))
		if (filteredMeetings.length > 0) {
			return filteredMeetings.map(item => <Meeting key={item.meetingId} details={item} ctrl={this.props.ctrl} teamMembers={this.props.teamMembers} />)
		} else {
			return (
				<div className="empty_state_card">
					You currently have no {this.state.isPast ? 'past' : 'upcoming'} meetings.
				</div>
			)
		}
	}
	componentDidMount(){
		console.log("All Meetings this.props.teamMembers:", this.props.teamMembers);
	}
	render(){
		return (
			<div className={"large_card_area all_meetings" + (this.state.isPast ? " past" : "")}>
				<header>
					<div className="topbar">
						<h2 className="container_title">
							All Meetings
						</h2>
						<a onClick={this.props.ctrl.createMeeting} className="button primary" role="button">Create Meeting</a>
					</div>
					<div className="content_filters">
						<a className="upcoming_button" onClick={()=>this.toggleMeetings(false)} role="button">Upcoming</a>
						<a className="past_button" onClick={()=>this.toggleMeetings(true)} role="button">Past</a>
					</div>
				</header>
				<main>
					{ this.getMeetingList() }
				</main>
			</div>
			)
	}
}

export default AllMeetings