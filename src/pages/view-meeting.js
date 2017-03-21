import React, { Component } from 'react'
import moment from 'moment'
import { generateRGBColor } from '../helpers/color-generator'
import MarkdownRenderer from '../components/markdown-renderer'
import { formatToLongTime } from '../helpers/format-time'
import LoadingImage from '../components/loading-image'
import axios from 'axios'

//API: pull event details
//API: check if user has permission
//API: pull all attendee details

class ViewMeeting extends Component {
	constructor(props){
		super(props)
		// In the final implementation, you would do a GET request
		// 		to get the element with the ID === props.params.id
		this.state = {
			meeting: {},
			loading: true
		}
	}
	componentDidMount(){
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
			console.log("RESPONSE", response);
			console.log("GOT MEETING");
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	getInitials(fullName) {
		let names = fullName.split(" ");
		let initials = "";
		names.forEach(name => initials += name.charAt(0));
		return initials;
	}
	render(){
		let content = (<p>hey</p>);
		if(this.state.loading == true) {
			content = (
				<div className="loading-container">
					<LoadingImage />
					<span>Loading Content...</span>
				</div>
			)
		} else {
			const meetingTime = this.state.meeting.time ? moment(this.state.meeting.time).format("ddd Do MMM, h:mma") : "Time TBC"
			const meetingTimeTitle = this.state.meeting.time ? moment(this.state.meeting.time).format("dddd Do MMMM YYYY, h:mma") : "Time TBC"
			const minutes = this.state.meeting.minutes == null ? ""
													   : (
														<section>
															<h3>Minutes</h3>
															<MarkdownRenderer
																content={this.state.meeting.minutes}/>
														</section>
													   )
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
							<p>{ this.state.meeting.meetingLocation }</p>
						</section>

						<section>
							<h3>Agenda</h3>
							<MarkdownRenderer
								content={this.state.meeting.agenda}/>
						</section>

						{ minutes }

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
											.sort((a,b)=> a === true ? 0 : 1)
											.map(attendee => {
												const classes = `attendee_block ${attendee.status == "" ? "unresponsive" : "responsive"}`
												const blockTitle = `${this.getInitials(attendee.name)} has ${attendee.status == "" ? "not yet " : ""}responded`
												return (
													<div
														key={attendee.id}
														className={classes}
														title={blockTitle}
														style={{backgroundColor: generateRGBColor(this.getInitials(attendee.name))}} >
														<span className="attendee_initials">{this.getInitials(attendee.name)}</span>
													</div>
												)
											})
										}
									</div>
								</div>
							</div>
						</section>

						<footer>
							<a onClick={()=>this.props.ctrl.dashboard()} className="button cancel maxed" role="button">Back</a>
						</footer>
					</main>
				</div>
			)
		}
		
		return content;
	}
}

export default ViewMeeting