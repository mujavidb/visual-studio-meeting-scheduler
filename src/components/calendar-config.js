//  Not sure what folder this file should be in!



import moment from 'moment'
import $ from 'jquery'

const calendarConfig = {
    header: {
    	left: '',
		center: 'title',
		right: ''
    },
    titleFormat: 'MMM D YYYY',
    defaultView: 'agendaWeek',
    defaultDate: moment(),
    firstDay: 1,
    columnFormat: 'ddd D/M',
    allDaySlot: false,
    navLinks: true, // can click day/week names to navigate views
	selectable: true,
	selectHelper: true,
	select: function(start, end) {
		var title = "busy";
		var eventData;
		if (title) {
			eventData = {
				title: title,
				start: start,
				end: end
			};
			$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
		}
		$('#calendar').fullCalendar('unselect');
	},
	eventClick: function(calEvent, jsEvent, view) {
		view = $('#calendar').fullCalendar('getView');
		console.log(view);
		$('#calendar').fullCalendar('removeEvents', calEvent._id);
	},
	editable: true,
	eventOverlap: false,
	eventLimit: true, // allow "more" link when too many events
    
};

export { calendarConfig }