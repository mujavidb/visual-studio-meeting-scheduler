import React, { Component } from "react"
import ReactDOM from "react-dom"

//Import pages
import Dashboard from './pages/dashboard'
import CreateMeeting from './pages/create-meeting'
import ViewMeeting from './pages/view-meeting'
import RespondInvitation from './pages/respond-invitation'
import LoadingImage from './components/loading-image'

//MainController functions as router for application
class MainController extends Component {
	constructor(){
		super()

		this.updateTeamMembers = this.updateTeamMembers.bind(this);
		//ctrl object passed around update view
		this.ctrl = {
			dashboard: () => this.setState({current: <Dashboard ctrl={this.ctrl} teamMembers={this.state.teamMembers} />}),
			createMeeting: () => this.setState({current: <CreateMeeting ctrl={this.ctrl} teamMembers={this.state.teamMembers} />}),
			viewMeeting: id => this.setState({current: <ViewMeeting meetingId={id} ctrl={this.ctrl} teamMembers={this.state.teamMembers} />}),
			respondInvitation: id => this.setState({current: <RespondInvitation ctrl={this.ctrl} teamMembers={this.state.teamMembers} />})
		};
		this.state = {
			current: this.loadingImage(),
			teamMembers: [],
			loading: true
			// current: <CreateMeeting ctrl={this.ctrl} />
			// current: <RespondInvitation ctrl={this.ctrl} />
		};
	}
	getTeamMembers(){
		let _this = this;
		let context = VSS.getWebContext();
		VSS.require(["TFS/Core/RestClient"], function (TFS_Core_WebApi) {
		    // Get the REST client
		    console.log("PROJ ID:", context.project.id, "TEAM ID:", context.team.id);
		    TFS_Core_WebApi.getClient().getTeamMembers(context.project.id, context.team.id).then(function(response){
		    	console.log("TEAM MEMBERS BELOW");
		    	console.log(response);
		    	_this.updateTeamMembers(response);
		    }, function(error){
		    	console.log(error);
		    });
		});
	}
	updateTeamMembers(teamMembers){
		this.setState({teamMembers: teamMembers}, () => {
			this.ctrl.dashboard();
			console.log("STATE AFTER TEAM MEMBERS:", this.state);
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
	console.log("VSS IS READY!");
	ReactDOM.render(<MainController />, document.getElementById('root'));
})