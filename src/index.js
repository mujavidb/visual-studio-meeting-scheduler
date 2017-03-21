import React, { Component } from "react"
import ReactDOM from "react-dom"

//Import pages
import Dashboard from './pages/dashboard'
import CreateMeeting from './pages/create-meeting'
import ViewMeeting from './pages/view-meeting'
import RespondInvitation from './pages/respond-invitation'

//MainController functions as router for application
class MainController extends Component {
	constructor(){
		super()

		//ctrl object passed around update view
		this.ctrl = {
			dashboard: () => this.setState({current: <Dashboard ctrl={this.ctrl} />}),
			createMeeting: () => this.setState({current: <CreateMeeting ctrl={this.ctrl} />}),
			viewMeeting: id => this.setState({current: <ViewMeeting meetingId={id} ctrl={this.ctrl} />}),
			respondInvitation: id => this.setState({current: <RespondInvitation ctrl={this.ctrl} />})
		};
		this.state = {
			current: <Dashboard ctrl={this.ctrl} />,
			context: {}
			// current: <CreateMeeting ctrl={this.ctrl} />
			// current: <RespondInvitation ctrl={this.ctrl} />
		};
	}
	render(){
		return this.state.current
	}
}

VSS.ready(function(){
	console.log("VSS IS READY!");
	ReactDOM.render(<MainController />, document.getElementById('root'));
})