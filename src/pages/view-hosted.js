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
		this.selectTime = this.selectTime.bind(this)
		this.finaliseMeetingTime = this.finaliseMeetingTime.bind(this)
		this.state = {
			meeting: {},
			context: {},
			loading: true,
			selected_slot: false,
			sorted_slots: false,
		}
	}
	componentDidMount(){
		this.getMeeting();
	}
	getMeeting(){
		let _this = this;
		let context = {};
		context = VSS.getWebContext();
		while (context === {}); //pause until context received
		this.setState({context: context},() => {
			axios.defaults.headers.post['Content-Type'] = 'application/json';
			axios({
				method: 'get',
				url: `https://meeting-scheduler.azurewebsites.net/${context.account.id}/${_this.props.meetingId}/get`,
				withCredentials: true
			})
			.then(function (response) {
				_this.setState({meeting: response.data[0].meeting, loading: false}, () => {
					_this.sortMeetingSlots()
				});
			})
			.catch(function (error) {
			})
		})
	}
	selectTime(range){
		this.setState({selected_slot: range})
	}
	finaliseMeetingTime(){
		if (this.state.selected_slot !== false) {
			const data = {
				finalDate : {
					dateStart: this.state.selected_slot.start.toISOString(),
					dateEnd: this.state.selected_slot.end.toISOString()
				}
			}
			let context = VSS.getWebContext()
			let _this = this
			axios({
				method: 'post',
				url: `https://meeting-scheduler.azurewebsites.net/${context.account.id}/${_this.props.meetingId}/edit`,
				data: data,
				withCredentials: true
			})
			.then(function (response) {
			    _this.props.ctrl.dashboard.call();
			})
			.catch(function (error) {
			});
		}
	}
	sortMeetingSlots(){
		const attendees = this.state.meeting.attendees;
		let timeSlots = {}
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
							attendees: [{id: attendees[i].id, name: attendees[i].name}]
						}
					}
				}
			}
		}
		let sortedSlots = Object
							.keys(timeSlots)
							.map(key => timeSlots[key])
							.sort((a,b) => compareMilli(a.range.start, b.range.start))
		this.setState({sorted_slots: sortedSlots})
	}
	render(){
		console.log("About to render, here is loading state:")
		console.log(this.state.loading)
		let content = {};
		if (this.state.loading === true || this.state.sorted_slots === false) {
			content = (
				<div className="loading-container">
					<LoadingImage />
					<span>Loading Content...</span>
				</div>
			)
		} else {
			const meetingTime = this.state.meeting.finalDate ? moment(this.state.meeting.finalDate.dateStart).format("ddd Do MMM, H:mm") + " - " + moment(this.state.meeting.finalDate.dateEnd).format("H:mm") : "Time TBC"
			const meetingTimeTitle = this.state.meeting.finalDate ? moment(this.state.meeting.finalDate.dateStart).format("ddd Do MMMM YYYY, H:mm") + " - " + moment(this.state.meeting.finalDate.dateEnd).format("H:mm") : "Time TBC"

			let sortedSlots = this.state.sorted_slots
			console.log("Checking slots")
			console.log(this.state.sorted_slots)
			console.log(sortedSlots)

			let selected_message = ""
			if (this.state.selected_slot === false || this.state.selected_slot === undefined) {
				selected_message = "No time slot selected."
			} else {
				selected_message = this.state.selected_slot.start.format("dddd Do MMMM, h:mma") + " - " + this.state.selected_slot.end.format("h:mma")
			}

			let attendee_availabilities = ""
			if (this.state.meeting.finalDate) {
				attendee_availabilities = (
					<section>
						<h3>Attendee Availabilities</h3>
						<div className="attendee_availabilities">
							<div className="attendee_names">
								<span>Team Member</span>
								{
									this
									.state
									.meeting
									.attendees
									.map(attendee => {
										return <span>{attendee.name}</span>
									})
								}
							</div>
							<div className="attendee_slots">
								<div
									className="attendee_event_times"
									style={{width: `${sortedSlots.length * 150}px`}}>
									{
										sortedSlots
										.map(slot => {
											let time = slot.range.start.format("ddd Do h:mma-")
												+ slot.range.end.format("h:mma")
											return <span>{time}</span>
										})
									}
								</div>
								{
									this
									.state
									.meeting
									.attendees
									.map(attendee => {
										return (
											<div
												className="attendee_availability_row"
												style={{width: `${sortedSlots.length * 150}px`}}>
												{
													sortedSlots.map(slot => {
														let index = -1;
														for(let i = 0; i < slot.attendees.length; i++) {
															if (slot.attendees[i].id === attendee.id) {
																index = i;
																break;
															}
														}
														let value = (index > -1) ? "YES" : "NO";
														return <span className={value}>{value}</span>
													})
												}
											</div>
										)
									})
								}
								<div
									className="attendee_availability_select"
									style={{width: `${sortedSlots.length * 150}px`}}>
									{
										sortedSlots.map(slot => (
											<button
												className="button"
												onClick={()=>this.selectTime(slot.range)}>Select</button>
										))
									}
								</div>
							</div>
						</div>
						<strong>Selected time slot:</strong><span>{selected_message}</span>
					</section>
				)
			}

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

						{ attendee_availabilities }

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
							<button
								onClick={this.finaliseMeetingTime}
								className="button primary finalise maxed"
								disabled={this.state.selected_slot === false}
								role="button">Finalize Meeting Time</button>
						</footer>
					</main>
				</div>
			)
		}
		return content;
	}
}

export default ViewHosted