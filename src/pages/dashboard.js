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
			projectID: "",
			meetings: [],
			invitations: [],
			loading: true
		}
	}
	componentDidMount(){
		this.verifyOAuth();
		this.getDocument();
		this.getAllMeetings();
		this.getAllInvitations();
		console.log("WEB CONTEXT:", VSS.getWebContext());
	}
	verifyOAuth(){
		//TODO: update for OAuth
		this.setState({authToken: "smoa98hjr738fqbhn98hrj4mnqr93om"});
		// this.getUserID();
		// this.getProjectID();
	}
	// getUserID(){
	// 	//TODO: update to get user id
	// 	let context = VSS.getWebContext();
	// 	this.setState({userID: context.user.id});
	// 	// this.getAllEvents()
	// }
	// getProjectID(){
	// 	let context = VSS.getWebContext();
	// 	console.log("GET PROJECT ID CONTEXT:", context);
	// 	console.log("ID:", context.project.id);
	// 	this.setState({projectID: context.project.id});
	// 	console.log("PROJECT ID:", this.state.projectID);
	// }
	getDocument(){
		let _this = this;
		let context = VSS.getWebContext();
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios({
			method: 'get',
			url: `https://meeting-scheduler.azurewebsites.net/document/create/${context.project.id}`,
			withCredentials: true
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});

	}
	getAllMeetings(){
		let _this = this;
		let context = VSS.getWebContext();
		axios({
			method: 'post',
			url: `https://meeting-scheduler.azurewebsites.net/${context.project.id}/meeting/responded/${context.user.id}`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({meetings: response.data});
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});

	}
	getAllInvitations(){
		let _this = this;
		let context = VSS.getWebContext();
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios({
			method: 'post',
			url: `https://meeting-scheduler.azurewebsites.net/${context.project.id}/meeting/unresponded/${context.user.id}`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({invitations: response.data, loading: false});
			console.log("INVITATIONS RESPONSE:", response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	getAllHostedMeetings(){
		let _this = this;
		let context = VSS.getWebContext();
		axios({
			method: 'post',
			url: `https://meeting-scheduler.azurewebsites.net/${context.project.id}/meeting/unresponded/${context.user.id}`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({invitations: response.data, loading: false});
			console.log("INVITATIONS RESPONSE:", response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	isInvitationFilter(meeting){
		return true;
	}
	render(){
		let content
		let context = VSS.getWebContext();
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
				<div className="big-container">
					<AllMeetings
						meetings={this.state.meetings}
						ctrl={this.props.ctrl}
						teamMembers={this.props.teamMembers}/>
					<Invitations
						invitations={this.state.invitations}
						ctrl={this.props.ctrl}
						teamMembers={this.props.teamMembers} />
					<HostedMeetings
						meetings={this.state.meetings.filter(a => context.user.id === a.hostId)}
						ctrl={this.props.ctrl}
						teamMembers={this.props.teamMembers} />
				</div>
			)
		}
		return content
	}
}

export default Dashboard