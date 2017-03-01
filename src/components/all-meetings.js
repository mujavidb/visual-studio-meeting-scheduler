import React, { Component } from 'react'
import Meeting from './meeting.js'
import moment from 'moment'

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
	filterUpcoming(isUpcoming){
		return item => {
			if(!item.time) return isUpcoming;
			return moment(item.time).isAfter(moment()) === isUpcoming;
		}
	}
	render(){
		return (
			<div className={"large_card_area all_meetings" + (this.state.isPast ? " past" : "")}>
				<header>
					<div className="topbar">
						<h2 className="container_title">
							All Meetings&nbsp;
							<span className="badge">({this.props.meetings.length})</span>
						</h2>
						<a onClick={this.props.ctrl.createMeeting} className="button primary" role="button">Create Meeting</a>
					</div>
					<div className="content_filters">
						<a className="upcoming_button" onClick={()=>this.toggleMeetings(false)} role="button">Upcoming</a>
						<a className="past_button" onClick={()=>this.toggleMeetings(true)} role="button">Past</a>
					</div>
				</header>
				<main>
						{
							this
							.props
							.meetings
							.filter(this.filterUpcoming(this.state.isPast))
							.map(item => <Meeting key={item.id} details={item} ctrl={this.props.ctrl}/>)
						}
				</main>
			</div>
			)
	}
}

export default AllMeetings