import React, { Component } from "react"
import fullcalendar from 'fullcalendar'
import moment from 'moment'
import $ from 'jquery'
import { calendarConfig } from "../helpers/calendar-config.js"

export default class Calendar extends Component {
	componentDidMount() {
		const { calendar } = this.refs;

		$(calendar).fullCalendar({
		    header: {
		    	left: '',
				center: 'title',
				right: ''
		    },
		    titleFormat: 'MMM D YYYY',
		    defaultView: 'agendaWeek',
		    defaultDate: moment(),
		    firstDay: 1,
		    scrollTime: '08:00:00',
		    columnFormat: 'ddd D/M',
		    allDaySlot: false,
		    navLinks: false, // can click day/week names to navigate views
			selectable: true,
			selectHelper: true,
			select: function(start, end) {
				var title = "Meeting Slot";
				var eventData = {
					title: title,
					start: start,
					end: end
				};
				$(calendar).fullCalendar('renderEvent', eventData, true); // stick? = true
				$(calendar).fullCalendar('unselect');
			},
			eventClick: function(calEvent, jsEvent, view) {
				view = $(calendar).fullCalendar('getView');
				console.log(view);
				$(calendar).fullCalendar('removeEvents', calEvent._id);
			},
			editable: true,
			eventOverlap: true,
			eventLimit: true, // allow "more" link when too many events

		});
	}

	render() {
		return (
			<div ref="calendar"></div>
		);
	}
}