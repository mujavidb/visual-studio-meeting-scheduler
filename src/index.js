import React, { Component } from "react"
import ReactDOM from "react-dom"

import Dashboard from './components/dashboard'
import CreateMeeting from './components/create-meeting'
import ViewMeeting from './components/view-meeting'
import RespondInvitation from './components/respond-invitation'

class MainController extends Component {
	constructor(){
		super()
		this.ctrl = {
			dashboard: () => this.setState({current: <Dashboard ctrl={this.ctrl} />}),
			viewMeeting: id => this.setState({current: <ViewMeeting id={id} ctrl={this.ctrl} />}),
			createMeeting: () => this.setState({current: <CreateMeeting ctrl={this.ctrl} />}),
			respondInvitation: id => this.setState({current: <RespondInvitation ctrl={this.ctrl} />})
		}
		this.state = {
			current: <Dashboard ctrl={this.ctrl} />
		}
	}
	render(){
		return this.state.current
	}
}

ReactDOM.render(<MainController />, document.getElementById('root'))