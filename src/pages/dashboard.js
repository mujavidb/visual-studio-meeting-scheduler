import React, { Component } from "react"
import Invitations from '../components/all-invitations'
import AllMeetings from '../components/all-meetings'
import LoadingImage from '../components/loading-image'
import axios from 'axios'

//API: OAuth
//API: get user id
//API: pull all events
//API: get all user details

class Dashboard extends Component {
	constructor(props){
		super(props)
		this.context = VSS.getWebContext()
		this.state = {
			authToken: "",
			userID: "",
			projectID: "",
			meetings: [],
			loading: true
		}
	}
	componentDidMount(){
		this.verifyOAuth();
		this.getAllMeetings();
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
	getAllMeetings(){
		console.log("Get all meetings is running");
		let _this = this;
		var contextPromise = new Promise(function(resolve, reject){
			let context = VSS.getWebContext();
			resolve(context);
		});
		contextPromise.then(function(context){
			axios.defaults.headers.post['Content-Type'] = 'application/json';
			axios({
				method: 'get',
				url: `https://meeting-scheduler.azurewebsites.net/document/create/${context.project.id}`,
				withCredentials: true
			})
			.then(function (response) {
				_this.setState({meetings: response.data.meetings, loading: false})
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		});	
		
	}
	getContext(_callback){

	}
	isInvitationFilter(meeting){
		console.log(meeting);
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