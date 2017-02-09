import { Component, OnInit } from '@angular/core';
import { Meeting } from './meeting';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { MeetingService } from './meeting.service';

import 'rxjs/add/operator/switchMap';

declare var moment: any;

@Component({
	host: {'class': 'large_card_area single_meeting'},
	selector: 'single-meeting',
  	templateUrl: './single-meeting.component.html',
  	providers: [MeetingService]
})

export class SingleMeetingComponent implements OnInit{
	meeting: Meeting;

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

	goBack(): void {
		this.location.back();
	}

	isPast(time: string): boolean {
		return new moment(time).isBefore(new moment());
	}
}
