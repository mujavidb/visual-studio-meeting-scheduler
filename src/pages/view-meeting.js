import React, { Component } from 'react'
import moment from 'moment'
import { generateRGBColor } from '../helpers/color-generator'
import MarkdownRenderer from '../components/markdown-renderer'
import { formatToLongTime } from '../helpers/format-time'
import LoadingImage from '../components/loading-image'
import axios from 'axios'

class ViewMeeting extends Component {
	constructor(props){
		super(props)
		this.state = {
			meeting: {},
			loading: true
		}
		this.getMeeting();
	}
	getMeeting(){
		console.log("GET MEETING");
		let context = VSS.getWebContext();
		let _this = this;
		axios({
			method: 'get',
			url: `https://meeting-scheduler.azurewebsites.net/${context.project.id}/${this.props.meetingId}/get`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({meeting: response.data[0].meeting, loading: false});
			console.log("RESPONSE");
			console.log(response);
			console.log("GOT MEETING");
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	getInitials(fullName) {
		let names = fullName.split(" ");
		let initials = "";
		names.forEach(name => initials += name.charAt(0));
		return initials;
	}
	render(){
		let content = (<p>hey</p>);
		if (this.state.loading == true) {
			content = (
				<div className="loading-container">
					<LoadingImage />
					<span>Loading Content...</span>
				</div>
			)
		} else {
			const meetingTime = this.state.meeting.finalDate ? moment(this.state.meeting.finalDate.dateStart).format("ddd Do MMM, H:mm") + " - " + moment(this.state.meeting.finalDate.dateEnd).format("H:mm") : "Time TBC"
			const meetingTimeTitle = this.state.meeting.finalDate ? moment(this.state.meeting.finalDate.dateStart).format("ddd Do MMMM YYYY, H:mm") + " - " + moment(this.state.meeting.finalDate.dateEnd).format("H:mm") : "Time TBC"
			const context = VSS.getWebContext();
			content = (
				<div className="large_card_area single_meeting">
					<header>
						<div className="topbar">
							<h2 className="container_title">{ this.state.meeting.meetingName }</h2>
							<h2 className="container_date" title={meetingTimeTitle}>{ meetingTime }</h2>
						</div>
					</header>
					<main>
						<section>
							<h3>Location</h3>
							<p className="location_area">
								{ this.state.meeting.meetingLocation ? this.state.meeting.meetingLocation : "No location set."}
							</p>
						</section>

						<section>
							<h3>Agenda</h3>
							<MarkdownRenderer
								content={this.state.meeting.agenda ? this.state.meeting.agenda : "No agenda set for this meeting."}/>
						</section>

						{
							this.state.meeting.minutes == null ? "" :
							(
								<section>
									<h3>Minutes</h3>
									<MarkdownRenderer
										content={this.state.meeting.minutes}/>
								</section>
							)
						}

						<section>
							<h3>Attendees</h3>
							<div className="attendee_area">
								<div className="attendee_added">
									<div className="attendees">
										{
											this
											.state
											.meeting
											.attendees
											.sort((a,b)=> a === true ? 0 : 1) //FIX: make this actually work
											.map(attendee => {
												const user = this.props.teamMembers.find(teamMember => attendee.id === teamMember.id)
												const classes = `attendee_block ${attendee.status == "" ? "unresponsive" : "responsive"}`
												const blockTitle = `${attendee.displayName} has ${attendee.status == "" ? "not yet " : ""}responded`
												return (
													<div
														key={attendee.id}
														id={attendee.id}
														className={classes}
														title={blockTitle}
														style={{
																backgroundImage: `url(${user.imageUrl})`,
																backgroundSize: "cover",
															}}>
													</div>)

											})
										}
									</div>
								</div>
							</div>
						</section>

						<footer>
							<a onClick={()=>this.props.ctrl.dashboard()} className="button cancel maxed" role="button">Back</a>
							{
								context.user.id === this.state.meeting.hostId ?
									(
										<a
											onClick={()=>this.props.ctrl.updateMeeting(this.state.meeting.meetingId)}
											className="button primary maxed"
											role="button">Edit</a>
									)
									: ""
							}
						</footer>
					</main>
				</div>
			)
		}

		return content;
	}
}

export default ViewMeeting