//Import libs
import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

//Import components
import Dashboard from './components/dashboard.js'
import CreateMeeting from './components/create-meeting.js'
import ViewMeeting from './components/view-meeting.js'

// let state = createStore()
// 
// let state = {
// 	currentMeeting: null,
// 	updateMeeting(newMeeting){
// 		this.currentMeeting = newMeeting
// 		setTimeout(()=>{}, 100)
// 	},
// 	unsetCurrentMeeting(){
// 		this.currentMeeting = null
// 		setTimeout(()=>{}, 100)
// 	},
// 	getCurrentMeeting(){
// 		return this.currentMeeting
// 	}
// }

const Container = ({children}) => {
	return (<div>{children}</div>)
}

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Container}>
			<IndexRoute component={Dashboard}/>
			<Route path="create-meeting" component={CreateMeeting}/>
	    	<Route path="view-meeting/:id" component={ViewMeeting}/>
		</Route>
	</Router>
)

ReactDOM.render(routes, document.getElementById('root'))
// ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('root'))



// const routes = {
// 	path: '/',
// 	component: Container,
// 	indexRoute: { component: Dashboard },
// 	childRoutes: [
// 		{ 
// 			path: 'dashboard', 
// 			component: Dashboard 
// 		},
// 		{ 
// 			path: 'create-meeting', 
// 			component: CreateMeeting 
// 		},
// 		{ 
// 			path: 'view-meeting', 
// 			// component: ViewMeeting ,
// 			childRoutes: [
// 				{
// 					path: ':id',
// 					component: ViewMeeting
// 				}
// 			]
// 		}
// 	]
// }