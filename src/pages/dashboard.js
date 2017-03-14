import React, { Component } from "react"
import Invitations from '../components/all-invitations'
import AllMeetings from '../components/all-meetings'
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
		this.verifyOAuth();
		this.getAllMeetings();
	}
	verifyOAuth(){
		//TODO: update for OAuth
		this.setState({authToken: "smoa98hjr738fqbhn98hrj4mnqr93om"})
		this.getUserID()
	}
	getUserID(){
		//TODO: update to get user id
		this.setState({userID: "kjsadlj23"})
		// this.getAllEvents()
	}
	getAllMeetings(){
		console.log("Get all meetings is running");
		let _this = this
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios({
			method: 'get',
			url: `http://localhost:3000/document/create/funfun123123`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({meetings: response.data.meetings, loading: false})
			console.log(response)
		})
		.catch(function (error) {
			console.log(error)
		});
	}
	isInvitationFilter(meeting){
		console.log(meeting)
		return true;
	}
	render(){
		let content
		if (this.state.loading == true) {
			content = (
				<div className="loading-container">
					<LoadingImage />
					<span>Loading Content...</span>
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
				</div>
			)
		}
		return content
	}
}

export default Dashboard