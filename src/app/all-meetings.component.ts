import { Component, OnInit } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { Meeting } from './meeting';

@Component({
	host: {'class': 'large_card_area all_meetings'},
	selector: 'all-meetings',
  	templateUrl: './all-meetings.component.html'
})

export class AllMeetingsComponent {
	meetings: Meeting[];

	ngOnInit() {
		this.meetings = [
							{
								"id"			: "1", 
								"name"			: "Plan Client Presentation", 
								"time"			: "Tuesday 2nd February at 14:30", 
								"description"	: "Example description", 
								"location"		: "MPEB 6.21, UCL", 
								"minutes"		: "This is what we talked about", 
								"agenda"		: "This is what we talked about"
							}
						];
	}
}
