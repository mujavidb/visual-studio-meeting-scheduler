import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Meeting } from './meeting';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { MeetingService } from './meeting.service';

import 'rxjs/add/operator/switchMap';

declare var moment: any;
declare var $: any;

@Component({
	host: {'class': 'large_card_area single_meeting'},
	selector: 'single-meeting',
  	templateUrl: './single-meeting.component.html',
  	providers: [MeetingService]
})

export class SingleMeetingComponent implements OnInit{
	meeting: Meeting;
	calendarOptions: Object;

	constructor(
  		private meetingService: MeetingService,
  		private route: ActivatedRoute,
  		private location: Location
	) {}

	ngOnInit(): void {
		// this.meeting = {
		// 	"id"			: "2",
		// 	"name"			: "Weekly Standup",
		// 	"time"			: "",
		// 	"description"	: "Example description",
		// 	"location"		: "Break room",
		// 	"minutes"		: "This is what we talked about",
		// 	"agenda"		: "This is what we will talk about"
		// };
		this.route.params
    		.switchMap((params: Params) => this.meetingService.getMeeting(params['id']))
    		.subscribe(meeting => this.meeting = meeting);
	}

	ngAfterViewInit(): void {
		var startMom = moment('2016-12-25');
    	var endMom = moment('2016-12-28');
		this.calendarOptions = {
	        header: {
	        	left: '',
				center: 'title',
				right: ''
	        },
	        titleFormat: 'MMM D YYYY',
	        defaultView: 'agendaWeek',
	        defaultDate: moment('2016-12-25'),
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
				console.log(startMom);
				view = $('#calendar').fullCalendar('getView');
				console.log(view);
				$('#calendar').fullCalendar('removeEvents', calEvent._id);
			},
			editable: true,
			eventOverlap: false,
			eventLimit: true, // allow "more" link when too many events
	        
	    };
	}

	goBack(): void {
		this.location.back();
	}

	isPast(time: string): boolean {
		return new moment(time).isBefore(new moment());
	}
}
