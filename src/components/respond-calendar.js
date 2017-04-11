import React, { Component } from "react"
import fullcalendar from 'fullcalendar'
import moment from 'moment-timezone'
import $ from 'jquery'

export default class RespondCalendar extends Component {
	constructor(props){
		super(props)
		this.events = this.props.timeSlots.map(a => ({
			start:moment(a.dateStart),
			end:moment(a.dateEnd),
			editable: false,
			resourceEditable: false
		}))
		this.state = {
			selected: []
		}
		const bg = {backgroundColor: "#10CC89"}
	}
	componentDidMount() {
		console.log("EVENTS:", this.events);
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
			selectable: false,
			selectHelper: true,
			slotLabelFormat: "h(:mm)a",
			eventClick: function(calendarEvent, jsEvent, view) {
				const $this = $(this)
				if ($this.hasClass("selected")){
					_this.setState({selected: _this.state.selected.filter(e=>e!=calendarEvent)}, () => {
						$this.removeClass("selected")
						console.log(_this.state.selected)
						_this.props.onSelectTimeSlots(_this.state.selected)
					})
				} else {
					_this.setState({selected: [..._this.state.selected, calendarEvent]}, () => {
						$this.addClass("selected")
						console.log(_this.state.selected)
						_this.props.onSelectTimeSlots(_this.state.selected)
					})
				}
			},
			editable: true,
			eventOverlap: true,
			eventLimit: true // allow "more" link when too many events
		})
		$(calendar).fullCalendar('addEventSource', this.events)
	}

	render() {
		return (
			<div>
				<span className="label">Click a proposed time slot to mark it as possible. You can select multiple slots.</span>
				<div className="full_calendar_area">
					<div ref="calendar"></div>
				</div>
			</div>
		);
	}
}