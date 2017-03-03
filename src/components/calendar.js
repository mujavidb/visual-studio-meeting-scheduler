import React, { Component } from "react"
import fullcalendar from 'fullcalendar'
import moment from 'moment'
import $ from 'jquery'

export default class Calendar extends Component {
	constructor(props){
		super(props);
		this.currentID = 0;
	}
	componentDidMount() {
		const { calendar } = this.refs;
		var that = this;
		$(calendar).fullCalendar({
		    header: {
		    	left: '',
				center: '',
				right: 'prev,next today'
		    },
		    titleFormat: 'MMM D YYYY',
		    defaultView: 'agendaWeek',
		    defaultDate: moment(),
		    firstDay: 1,
		    scrollTime: '08:00:00',
		    columnFormat: 'ddd D MMM',
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
				var events = $(calendar).fullCalendar('clientEvents');
				that.props.onChangeTimeSlots(events);
				$(calendar).fullCalendar('unselect');

			},
			eventClick: function(calEvent, jsEvent, view) {
				view = $(calendar).fullCalendar('getView');
				$(calendar).fullCalendar('removeEvents', calEvent._id);
				var events = $(calendar).fullCalendar('clientEvents');
				that.props.onChangeTimeSlots(events);
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