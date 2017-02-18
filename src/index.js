import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

import Dashboard from './components/dashboard.js'
import CreateMeeting from './components/create-meeting.js'
import ViewMeeting from './components/view-meeting.js'

const Container = ({children}) => {
	return (<div>{children}</div>)
}

const routes = {
	path: '/',
	component: Container,
	indexRoute: { component: Dashboard },
	childRoutes: [
		{ 
			path: 'dashboard', 
			component: Dashboard 
		},
		{ 
			path: 'create-meeting', 
			component: CreateMeeting 
		},
		{ 
			path: 'view-meeting', 
			// component: ViewMeeting ,
			childRoutes: [
				{
					path: ':id',
					component: ViewMeeting
				}
			]
		}
	]
}

ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('root'))
