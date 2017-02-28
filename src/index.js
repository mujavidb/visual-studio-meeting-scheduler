import React, { Component } from "react"
import ReactDOM from "react-dom"

import Dashboard from './components/dashboard.js'
import CreateMeeting from './components/create-meeting.js'
import ViewMeeting from './components/view-meeting.js'

class MainController extends Component {
	constructor(){
		super()
		this.viewMeeting = this.viewMeeting.bind(this)
		this.createMeeting = this.createMeeting.bind(this)
		this.dashboard = this.dashboard.bind(this)
		this.ctrl = {
			dashboard: this.dashboard,
			viewMeeting: this.viewMeeting,
			createMeeting: this.createMeeting
		}
		this.state = {
			current: <Dashboard ctrl={this.ctrl} />
		}
	}
	createMeeting(){
		this.setState({current: <CreateMeeting ctrl={this.ctrl} />})
	}
	viewMeeting(id){
		console.log("testing");
		this.setState({current: <ViewMeeting id={id} ctrl={this.ctrl} />})
	}
	dashboard(){
		this.setState({current: <Dashboard ctrl={this.ctrl} />})
	}
	render(){
		return this.state.current
	}
}

ReactDOM.render(<MainController />, document.getElementById('root'))