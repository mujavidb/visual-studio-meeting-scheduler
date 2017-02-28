import React, { Component } from "react"
import fullcalendar from 'fullcalendar'
import moment from 'moment'
import $ from 'jquery'
import { calendarConfig } from "./calendar-config.js"

export default class Calendar extends Component {
	componentDidMount() {
		const { calendar } = this.refs;

		$(calendar).fullCalendar(calendarConfig);
	}

	render() {
		return (
			<div ref="calendar"></div>
		);
	}
}