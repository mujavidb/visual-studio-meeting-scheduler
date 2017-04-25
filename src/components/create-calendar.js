import React, { Component } from "react"
import fullcalendar from 'fullcalendar'
import moment from 'moment-timezone'
import $ from 'jquery'

//TODO: Add ability to load in meetings
//TODO: Add handles to move between dates
//TODO: Find way to highlight meetings in other weeks to user
//TODO: Find ways to show all meetings to a user and
//		have them select the most favourable

export default class CreateCalendar extends Component {
	constructor(props){
		super(props);
		this.currentID = 0;
		if(this.props.editTimeSlots) {
			this.events = this.props.editTimeSlots.map(a => ({
				start:moment(a.dateStart),
				end:moment(a.dateEnd),
				editable: false
			}))
		} else {
			this.events = []
		}
	}
	componentDidMount() {
		const { calendar } = this.refs;
		const _this = this;
		$(calendar).fullCalendar({
		    header: {
		    	left: 'prev',
				center: 'title',
				right: 'next'
		    },
		    titleFormat: 'MMMM Do, YYYY',
		    defaultView: 'agendaWeek',
		    defaultDate: moment(),
		    firstDay: 1,
		    scrollTime: '08:00:00',
		    columnFormat: 'dddd\nDo',
		    allDaySlot: false,
		    navLinks: false,
			selectable: true,
			selectHelper: true,
			slotLabelFormat: "h(:mm)a",
			select: function(start, end) {
				const eventData = {
					start: start,
					end: end
				}
				if(!start.isBefore(moment())) {
					$(calendar).fullCalendar('renderEvent', eventData, true); // stick? = true
					var events = $(calendar).fullCalendar('clientEvents');
					_this.props.onChangeTimeSlots(events);
				} else {
					alert("No events in the past!");
				}
				$(calendar).fullCalendar('unselect');

			},
			eventClick: function(calEvent, jsEvent, view) {
				view = $(calendar).fullCalendar('getView')
				$(calendar).fullCalendar('removeEvents', calEvent._id)
				const events = $(calendar).fullCalendar('clientEvents')
				_this.props.onChangeTimeSlots(events)
			},
			editable: true,
			eventOverlap: true,
			eventLimit: true // allow "more" link when too many events
		})
		this.events.forEach(event => {
			$(calendar).fullCalendar('renderEvent', event, true); // stick? = true
			var events = $(calendar).fullCalendar('clientEvents');
			_this.props.onChangeTimeSlots(events);
		})
	}

	render() {
		return (
			<div>
				<span className="label">Highlight the times you would like to suggest for this meeting.</span>
				<div className="full_calendar_area">
					<div ref="calendar"></div>
				</div>
			</div>
		);
	}
}