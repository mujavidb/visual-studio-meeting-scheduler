import React, { Component } from 'react'
import moment from 'moment'
import { generateRGBColor } from '../helpers/color-generator'
import MarkdownRenderer from '../components/markdown-renderer'
import { formatToLongTime } from '../helpers/format-time'
import LoadingImage from '../components/loading-image'
import axios from 'axios'

function compareMilli(a,b) {
	if(a.milli > b.milli) return -1;
	if(a.milli < b.milli) return 1;
	return 0;
}

class ViewHosted extends Component {
	constructor(props){
		super(props)
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
			console.log("RESPONSE");
			console.log(response);
			console.log("GOT MEETING");
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	render(){
		let content = {};
		if (this.state.loading === true || this.state.meeting === {}) {
			content = (
				<div className="loading-container">
					<LoadingImage />
					<span>Loading Content...</span>
				</div>
			)
		} else {
			const meetingTime = this.state.meeting.time ? moment(this.state.meeting.time).format("ddd Do MMM, h:mma") : "Time TBC"
			const meetingTimeTitle = this.state.meeting.time ? moment(this.state.meeting.time).format("dddd Do MMMM YYYY, h:mma") : "Time TBC"

			const attendees = this.state.meeting.attendees;
			const timeSlots = {}
			for (let i = 0; i < attendees.length; i++) {
				if (attendees[i].availableTimes.length > 0) {
					for (let j = 0; j < attendees[i].availableTimes.length; j++){
						let range = {
							start: moment(attendees[i].availableTimes[j].dateStart),
							end: moment(attendees[i].availableTimes[j].dateEnd)
						}
						let rangeStr = range.start.toString() + range.end.toString()
						if (rangeStr in timeSlots) {
							timeSlots[rangeStr].attendees.push({id: attendees[i].id, name: attendees[i].name})
						} else {
							timeSlots[rangeStr] = {
								range: range,
								attendees: []
							}
						}
					}
				}
			}
			console.log("timeSlots")
			console.log(timeSlots)
			let sortedSlots = Object
								.keys(timeSlots)
								.map(key => timeSlots[key])
								.sort((a,b) => compareMilli(a.range.start, b.range.start))
			console.log(sortedSlots)

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
							<h3>Attendee Availabilities</h3>
							<table>
								<thead>
									<td>Team Member</td>
									{
										sortedSlots.map(slot => {
											let time = slot.range.start.format("ddd Do[\n] h:mma [\n - \n]")
												+ slot.range.end.format("h:mma")
											return <td>{time}</td>
										})
									}
								</thead>
								{
									this
									.state
									.meeting
									.attendees
									.map(attendee => {
										return (
											<tr>
												<td>{attendee.name}</td>
												{
													sortedSlots.map(slot => {
														let index = -1;
														for(let i = 0; i < slot.attendees.length; i++) {
															if (slot.attendees[i].id === attendee.id) {
																index = i;
																break;
															}
														}
														return <td>{(index > -1) ? "YES" : "NO"}</td>
													})
												}
											</tr>
										)
									})
								}
							</table>
						</section>

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
								this.userID === this.state.meeting.hostId ?
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

export default ViewHosted