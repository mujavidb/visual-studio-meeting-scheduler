import React, { Component } from "react"
import Invitations from '../components/all-invitations'
import AllMeetings from '../components/all-meetings'
import HostedMeetings from '../components/hosted-meetings'
import LoadingImage from '../components/loading-image'
import axios from 'axios'

class Dashboard extends Component {
	constructor(props){
		super(props)
		this.state = {
			userID: "",
			projectID: "",
			meetings: [],
			invitations: [],
			loading: true,
			context: {}
		}
	}
	componentDidMount(){
		this.getDocument();
	}
	getDocument(){
		let _this = this;
		let context = {};
		context = VSS.getWebContext();
		while (context === {}); //pause until context received
		console.log("WEB CONTEXT:");
		console.log(context);
		this.setState({context: context}, () => {
			axios.defaults.headers.post['Content-Type'] = 'application/json';
			axios({
				method: 'get',
				url: `https://meeting-scheduler.azurewebsites.net/document/create/${context.project.id}`,
				withCredentials: true
			})
			.then(function (response) {
				console.log("Document");
				console.log(response);
				_this.getAllMeetings();
				_this.getAllInvitations();
			})
			.catch(function (error) {
				console.log(error);
			});
		})

	}
	getAllMeetings(){
		let _this = this;
		axios({
			method: 'post',
			url: `https://meeting-scheduler.azurewebsites.net/${this.state.context.project.id}/meeting/responded/${this.state.context.user.id}`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({meetings: response.data});
			console.log("Meetings");
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});

	}
	getAllInvitations(){
		let _this = this;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios({
			method: 'post',
			url: `https://meeting-scheduler.azurewebsites.net/${this.state.context.project.id}/meeting/unresponded/${this.state.context.user.id}`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({invitations: response.data, loading: false});
			console.log("INVITATIONS RESPONSE:");
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	render(){
		let body
		if (this.state.loading == true) {
			body = (
				<div>
					<div className="loading-container">
						<LoadingImage />
						<span>Loading body...</span>
					</div>
				</div>
			)
		} else {
			body = (
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
						meetings={this.state.meetings.filter(a => this.state.context.user.id === a.hostId)}
						ctrl={this.props.ctrl}
						teamMembers={this.props.teamMembers} />
				</div>
			)
		}
		return body
	}
}

export default Dashboard