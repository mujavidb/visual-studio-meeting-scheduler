import React, { Component } from "react"
import ReactDOM from "react-dom"

//Import pages
import Dashboard from './pages/dashboard'
import CreateMeeting from './pages/create-meeting'
import ViewMeeting from './pages/view-meeting'
import RespondInvitation from './pages/respond-invitation'
import LoadingImage from './components/loading-image'
import UpdateMeeting from './pages/update-meeting'
import ViewHosted from './pages/view-hosted'

//MainController functions as router for application
class MainController extends Component {
	constructor(){
		super()
		this.updateTeamMembers = this.updateTeamMembers.bind(this);

		//ctrl object passed around to update view
		this.ctrl = {
			dashboard           : () => this.setState({current: <Dashboard ctrl={this.ctrl} teamMembers={this.state.teamMembers} />}),
			createMeeting       : () => this.setState({current: <CreateMeeting ctrl={this.ctrl} teamMembers={this.state.teamMembers} />}),
			viewMeeting         : id => this.setState({current: <ViewMeeting meetingId={id} ctrl={this.ctrl} teamMembers={this.state.teamMembers} />}),
			viewHosted          : id => this.setState({current: <ViewHosted meetingId={id} ctrl={this.ctrl} teamMembers={this.state.teamMembers} />}),
			respondInvitation   : id => this.setState({current: <RespondInvitation ctrl={this.ctrl} meetingId={id} teamMembers={this.state.teamMembers} />}),
			updateMeeting 		: id => this.setState({current: <UpdateMeeting meetingId={id} ctrl={this.ctrl} teamMembers={this.state.teamMembers} />})
		};
		this.state = {
			current: this.loadingImage(),
			teamMembers: [],
			loading: true
		};
	}
	getTeamMembers(){
		let _this = this;
		let context = VSS.getWebContext();
		VSS.require(["TFS/Core/RestClient"], function (TFS_Core_WebApi) {
		    TFS_Core_WebApi.getClient().getTeamMembers(context.project.id, context.team.id).then(function(response){
		    	_this.updateTeamMembers(response);
		    }, function(error){
		    	console.log(error);
		    });
		});
	}
	updateTeamMembers(teamMembers){
		this.setState({teamMembers: teamMembers}, () => {
			this.ctrl.dashboard();
		});
	}
	loadingImage(){
		return(
			<div className="loading-container">
				<LoadingImage />
				<span>Loading Content...</span>
			</div>
		)
	}
	componentDidMount(){
		this.getTeamMembers();
	}
	render(){
		return this.state.current;
	}
}

VSS.ready(function(){
	let context = VSS.getWebContext();
	FB.AppEvents.setUserID(context.user.id);
	ReactDOM.render(<MainController />, document.getElementById('root'));
})