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
		this.state = {
			current: <Dashboard
							viewMeeting={this.viewMeeting}
							createMeeting={this.createMeeting} />
		}
	}
	createMeeting(){
		this.setState({current: <CreateMeeting />})
	}
	viewMeeting(id){
		console.log("testing");
		this.setState({current: <ViewMeeting id={id}/>})
	}
	render(){
		return this.state.current
	}
}

ReactDOM.render(<MainController />, document.getElementById('root'))