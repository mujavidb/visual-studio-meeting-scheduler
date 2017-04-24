import React, { Component } from 'react'
import moment from 'moment'
import { generateRGBColor } from '../helpers/color-generator'
import RespondCalendar from '../components/respond-calendar'
import MarkdownRenderer from '../components/markdown-renderer'
import LoadingImage from '../components/loading-image'
import axios from 'axios'

class RespondInvitation extends Component {
	constructor(props){
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
		this.updateSelectedTimeSlots = this.updateSelectedTimeSlots.bind(this)
		this.state = {
			selected: [],
			loading: true,
			invitation: {}
		}
	}
	getMeeting(){
		let context = VSS.getWebContext();
		let _this = this;
		axios({
			method: 'get',
			url: `https://meeting-scheduler.azurewebsites.net/${context.account.id}/${_this.props.meetingId}/get`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({invitation: response.data[0].meeting, loading: false});
		})
		.catch(function (error) {
			console.log(error)
		});
	}
	updateSelectedTimeSlots(updatedSlots){
		this.setState({selected: updatedSlots})
	}
	componentDidMount(){
		this.getMeeting();
	}
	handleCheckboxChange(event){
		if(event.target.checked) {
			let selected = [{
				start: this.state.invitation.hostAvailability[0].dateStart,
				end: this.state.invitation.hostAvailability[0].dateEnd
			}]
			this.setState({selected: selected});
		} else {
			this.setState({selected: []});
		}
	}
	onSubmit(){
		let context = VSS.getWebContext();
		let _this = this;
		axios({
			method: 'post',
			url: `https://meeting-scheduler.azurewebsites.net/${context.account.id}/${_this.props.meetingId}/attendees/add`,
			data: {
				attendees: [
			        {
			            id: context.user.id,
			            response: 1,
			            name: context.user.name,
			            availableTimes: this.state.selected.map(a=>({dateStart: moment(a.start).toISOString(), dateEnd: moment(a.end).toISOString()}))
			        }
			    ]
			},
			withCredentials: true
		})
		.then(function (response) {
			_this.props.ctrl.dashboard.call();
		})
		.catch(function (error) {
		});
	}
	render(){
		let time
		if(this.state.invitation.finalDate){
			time = (moment(this.state.invitation.finalDate.dateStart).format("ddd Do MMM, H:mm") + " - " + moment(this.state.invitation.finalDate.dateEnd).format("H:mm"))
		}
		let availability
		if(this.state.invitation.finalDate) {
			availability = (
				<div>
					<h3>Time</h3>
					<p>{ time }</p>
					<label>Going</label>
					<input type="checkbox" name="isGoing" onChange={this.handleCheckboxChange} />
				</div>
			)
		} else {
			availability = (
				<div>
					<h3>Availability</h3>
					<RespondCalendar
						onSelectTimeSlots={this.updateSelectedTimeSlots}
						timeSlots={this.state.invitation.hostAvailability}
						ctrl={this.props.ctrl} />
				</div>
			)
		}
		let content
		if(this.state.loading){
			content = (
				<div className="loading-container">
					<LoadingImage />
					<span>Loading Content...</span>
				</div>
			)
		} else {
			content = (
				<div className="large_card_area single_meeting">
					<header>
						<div className="topbar">
							<h2 className="container_title">{ this.state.invitation.meetingName }</h2>
						</div>
					</header>
					<main>

						<section>
							<h3>Agenda</h3>
							<MarkdownRenderer
								content={this.state.invitation.agenda}/>
						</section>

						<section>
							{ availability }
						</section>


						<section>
							<h3>Attendees</h3>
							<div className="attendee_area">
								<div className="attendee_added">
									<div className="attendees">
										{
											this
											.state
											.invitation
											.attendees
											.filter(attendee => attendee.status == true)
											.map(attendee =>
												<div className="attendee_block" key={attendee.id} style={{backgroundColor: generateRGBColor(attendee.initials)}}>
													<span className="attendee_initials">{attendee.initials}</span>
												</div>
											)
										}
									</div>
								</div>
							</div>
						</section>

						<footer>
							<button onClick={this.props.ctrl.dashboard} className="button cancel maxed">Back</button>
							<button onClick={this.onSubmit} className="button primary maxed">Submit Availability</button>
						</footer>
					</main>
				</div>
			)
		}
		return content
	}
}

export default RespondInvitation