import React, { Component } from "react"
import Invitations from '../components/all-invitations'
import AllMeetings from '../components/all-meetings'
import HostedMeetings from '../components/hosted-meetings'
import LoadingImage from '../components/loading-image'
import axios from 'axios'

console.log(axios);

//API: OAuth
//API: get user id
//API: pull all events
//API: get all user details

class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			authToken: "",
			userID: "",
			meetings: [],
			loading: true
		}
	}
	componentDidMount(){
		this.getUserID();
	}
	getUserID(){
		//TODO: update to get user id
		this.setState({userID: "funfun123123"}, () => this.getAllMeetings())
	}
	getAllMeetings(){
		const _this = this
		axios.defaults.headers.post['Content-Type'] = 'application/json'
		axios({
			method: 'get',
			url: `http://localhost:3000/document/create/${this.state.userID}`,
			withCredentials: true
		})
		.then( response => {
			_this.setState({meetings: response.data.meetings, loading: false})
		})
		.catch( error => console.log(error))
	}
	isInvitationFilter(meeting){
		return true
	}
	render(){
		let content
		if (this.state.loading == true) {
			content = (
				<div>
					<div className="loading-container">
						<LoadingImage />
						<span>Loading Content...</span>
					</div>
				</div>
			)
		} else {
			content = (
				<div className="main-container">
					<AllMeetings
						meetings={this.state.meetings.filter(a => this.isInvitationFilter(a))}
						ctrl={this.props.ctrl} />
					<Invitations
						invitations={this.state.meetings.filter(a => a.status === false)}
						ctrl={this.props.ctrl} />
					<HostedMeetings
						meetings={this.state.meetings.filter(a => this.state.userID === a.hostId)}
						ctrl={this.props.ctrl} />
				</div>
			)
		}
		return content
	}
}

export default Dashboard