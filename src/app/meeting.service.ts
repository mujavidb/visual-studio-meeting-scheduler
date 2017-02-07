import { Injectable } from '@angular/core';
import { Meeting } from './meeting';
import { MEETINGS } from './mock-meetings';

@Injectable()
export class MeetingService {
	getMeetings(): Promise<Meeting[]> {
		return Promise.resolve(MEETINGS);
  	}

  	getMeeting(id: string): Promise<Meeting> {
  		return this.getMeetings()
  					.then(meetings => meetings.find(meeting => meeting.id === id));
  	}
}
