import React, { Component } from 'react'
import moment from 'moment'
import { generateRGBColor } from '../helpers/color-generator'
import RespondCalendar from '../components/respond-calendar'
import MarkdownRenderer from '../components/markdown-renderer'
import LoadingImage from '../components/loading-image'
import axios from 'axios'

//API: pull event details
//API: check if user has permission
//API: pull all attendee details

class RespondInvitation extends Component {
	constructor(props){
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
		this.updateSelectedTimeSlots = this.updateSelectedTimeSlots.bind(this)
		this.state = {
			selected: [],
			loading: true,
			invitation: {}
		}
	}
	getMeeting(){
		console.log("GET MEETING");
		let context = VSS.getWebContext();
		let _this = this;
		axios({
			method: 'get',
			url: `https://meeting-scheduler.azurewebsites.net/${context.project.id}/${_this.props.meetingId}/get`,
			withCredentials: true
		})
		.then(function (response) {
			console.log("RESPONSE", response);
			_this.setState({invitation: response.data[0].meeting, loading: false});
			console.log("GOT MEETING");
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	updateSelectedTimeSlots(updatedSlots){
		this.setState({selected: updatedSlots})
	}
	componentDidMount(){
		this.getMeeting();
	}
	onSubmit(){
		let context = VSS.getWebContext();
		let _this = this;
		axios({
			method: 'post',
			url: `https://meeting-scheduler.azurewebsites.net/${context.project.id}/${_this.props.meetingId}/attendees/add`,
			data: {
				attendees: [
			        {
			            id: context.user.id,
			            response: 1,
			            name: context.user.name,
			            availableTimes: this.state.selected.map(a=>({dateStart: moment(a.start).toString(), dateEnd: moment(a.end).toString()}))
			        }
			    ]
			},
			withCredentials: true
		})
		.then(function (response) {
			console.log(response);
			_this.props.ctrl.dashboard.call();
		})
		.catch(function (error) {
			console.log("CATCH:", error);
		});
	}
	render(){
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
							<h3>Availability</h3>
							<RespondCalendar
								onSelectTimeSlots={this.updateSelectedTimeSlots}
								timeSlots={this.state.invitation.hostAvailability}
								ctrl={this.props.ctrl} />
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