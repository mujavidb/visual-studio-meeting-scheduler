import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { Meeting } from './meeting';
import { MeetingService } from './meeting.service';

@Component({
	host: {'class': 'large_card_area all_meetings'},
	selector: 'all-meetings',
  	templateUrl: './all-meetings.component.html',
  	providers: [MeetingService]
})

export class AllMeetingsComponent implements OnInit {
	meetings: Meeting[];
	@Output() onClickedPast = new EventEmitter<boolean>();

	constructor(private meetingService: MeetingService) { }

	ngOnInit(): void {
		this.getMeetings();
	}

	onClickPast(clickedPast: boolean): void {
		this.onClickedPast.emit(clickedPast);
	}

	getMeetings(): void {
    	this.meetingService.getMeetings().then(meetings => this.meetings = meetings);
  	}
}
