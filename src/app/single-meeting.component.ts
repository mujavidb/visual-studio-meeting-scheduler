import { Component, OnInit } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { Meeting } from './meeting';

@Component({
	host: {'class': 'large_card_area single_meeting'},
	selector: 'single-meeting',
  	templateUrl: './single-meeting.component.html'
})

export class SingleMeetingComponent {
	meeting: Meeting;

	ngOnInit() {
		this.meeting = {
			"id"			: "2",
			"name"			: "Weekly Standup",
			"time"			: "",
			"description"	: "Example description",
			"location"		: "Break room",
			"minutes"		: "This is what we talked about",
			"agenda"		: "This is what we talked about"
		};
	}
}
