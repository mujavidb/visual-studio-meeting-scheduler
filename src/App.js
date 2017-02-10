import React, { Component } from 'react'

const Invitation = props => {
	return (
			<a href="single-meeting" className="meeting_card_container">
				<div className="meeting_card">
					<h3 className="meeting_title">{ props.details.name }</h3>
					<p className="meeting_datetime">{ props.details.time }</p>
					<p className="meeting_location">{ props.details.location }</p>
					<div className="attendees">
						<div className="attendee_block">
							<span className="attendee_initials">MB</span>
						</div>
						<div className="attendee_block">
							<span className="attendee_initials">AH</span>
						</div>
						<div className="attendee_block">
							<span className="attendee_initials">KC</span>
						</div>
					</div>
				</div>
			</a>
		)
}

const Invitations = props => {
	return (
			<div className="large_card_area invitations">
				<header>
					<div className="topbar">
						<h2 className="container_title">Invitations ({ props.invitations.length })</h2>
					</div>
				</header>
				<main>
					{ props.invitations.map( item => <Invitation key={item.id} details={item} />) }
				</main>
			</div>
		)
}

const Meeting = props => {
	return (
			<a href="single-meeting" className="meeting_card_container">
				<div className="meeting_card">
					<h3 className="meeting_title">{ props.details.name }</h3>
					<p className="meeting_datetime">{ props.details.time}</p>
					<p className="meeting_location">{ props.details.location }</p>
					<div className="attendees">
						<div className="attendee_block">
							<span className="attendee_initials">MB</span>
						</div>
						<div className="attendee_block">
							<span className="attendee_initials">AH</span>
						</div>
						<div className="attendee_block">
							<span className="attendee_initials">KC</span>
						</div>
					</div>
				</div>
			</a>
		)
}

class AllMeetings extends Component {
	constructor(props){
		super(props)
		this.state = {
			isPast: true
		}
		this.toggleMeetings = this.toggleMeetings.bind(this);
	}
	toggleMeetings(){
		this.setState({isPast: !this.state.isPast})
	}
	render(){
		const meetingsClasses = "large_card_area all_meetings" + (this.state.isPast ? " past" : "")
		return (
			<div className={meetingsClasses}>
				<header>
					<div className="topbar">
						<h2 className="container_title">
							All Meetings
							<span className="badge">({this.props.meetings.length})</span>
						</h2>
						<a href="create-meeting" className="button primary">Create Meeting</a>
					</div>
					<div className="content_filters">
						<a className="upcoming_button" onClick={this.toggleMeetings}>Upcoming</a>
						<a className="past_button" onClick={this.toggleMeetings}>Past</a>
					</div>
				</header>
				<main>
					<div className="upcoming">
						{this.props.meetings.map(item => <Meeting key={item.id} details={item}/>)}
					</div>
					<div className="past">
						{this.props.meetings.map(item => <Meeting key={item.id} details={item}/>)}
					</div>
				</main>
			</div>
			)
	}
}

class Dashboard extends Component {
	constructor(){
		super()
		this.meetings = [
			{
				"id"			: "1", 
				"name"			: "Plan Client Presentation", 
				"time"			: "2017-02-15T14:30:00+00:00", 
				"description"	: "Example description", 
				"location"		: "MPEB 6.21, UCL", 
				"minutes"		: "This is what we talked about", 
				"agenda"		: "This is what we will talk about"
			},
			{
				"id"			: "2",
				"name"			: "Weekly Standup",
				"time"			: "",
				"description"	: "Example description",
				"location"		: "Break room",
				"minutes"		: "This is what we talked about",
				"agenda"		: "This is what we will talk about"
			},
			{
				"id"			: "3", 
				"name"			: "Sales Review", 
				"time"			: "2017-02-06T15:30:00+00:00", 
				"description"	: "We're going to review some sales", 
				"location"		: "Board Room", 
				"minutes"		: "This is what we talked about", 
				"agenda"		: "This is what we will talk about"
			},
		]
		this.invitations = [
			{
				"id"			: "6", 
				"name"			: "Fun Sales Review", 
				"time"			: "2017-02-06T15:30:00+00:00", 
				"description"	: "We're going to review some sales", 
				"location"		: "Board Room", 
				"minutes"		: "This is what we talked about", 
				"agenda"		: "This is what we will talk about"
			},
		]
	}
	render(){
		return (
			<div className="main-container">
				<AllMeetings meetings={this.meetings}/>
				<Invitations invitations={this.invitations}/>
			</div>
			)
	}
}

export default class App extends Component {
  render() {
    return <Dashboard />
  }
}