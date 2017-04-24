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
			hosted: [],
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
		this.setState({context: context}, () => {
			axios.defaults.headers.post['Content-Type'] = 'application/json';
			axios({
				method: 'get',
				url: `https://meeting-scheduler.azurewebsites.net/document/create/${context.account.id}`,
				withCredentials: true
			})
			.then(function (response) {
				_this.getAllMeetings();
				_this.getAllInvitations();
				_this.getAllHostedMeetings();
			})
			.catch(function (error) {
			});
		})

	}
	getAllMeetings(){
		let _this = this;
		axios({
			method: 'post',
			url: `https://meeting-scheduler.azurewebsites.net/${this.state.context.account.id}/meeting/responded/${this.state.context.user.id}`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({meetings: response.data});
		})
		.catch(function (error) {
			console.log("Error getting data.")
		});

	}
	getAllInvitations(){
		let _this = this;

		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios({
			method: 'post',
			url: `https://meeting-scheduler.azurewebsites.net/${this.state.context.account.id}/meeting/unresponded/${this.state.context.user.id}`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({invitations: response.data});
		})
		.catch(function (error) {
			console.log("Error getting data.")
		});
	}
	getAllHostedMeetings(){
		let _this = this;
		let context = VSS.getWebContext();
		axios({
			method: 'get',
			url: `https://meeting-scheduler.azurewebsites.net/${this.state.context.account.id}/meeting/hosted/${this.state.context.user.id}`,
			withCredentials: true
		})
		.then(function (response) {
			_this.setState({hosted: response.data, loading: false}, () => {
				console.log("Just got hosted:");
				console.log(this.state.hosted);
			});
		})
		.catch(function (error) {
			console.log("Error getting data.")
		});
	}
	render(){
		let body
		let context = VSS.getWebContext()
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
					<HostedMeetings
						meetings={this.state.hosted}
						ctrl={this.props.ctrl}
						teamMembers={this.props.teamMembers} />
					<Invitations
						invitations={this.state.invitations}
						ctrl={this.props.ctrl}
						teamMembers={this.props.teamMembers} />
				</div>
			)
		}
		return body
	}
}

export default Dashboard