import { Injectable } from '@angular/core';
import { Meeting } from './meeting';
import { Http } from '@angular/http';
import { MEETINGS } from './mock-meetings';

@Injectable()
export class MeetingService {
	private meetingsUrl: string = 'api/meetings';

	constructor(http: Http) {}

	getMeetings(): Promise<Meeting[]> {
		return Promise.resolve(MEETINGS);
  	}

  	//this will be the implementation when we have an API to call
  	// getMeetings(): Promise<Meeting[]> {
  	// 	return this.http.get(this.meetingsUrl)
  	// 					.toPromise()
  	// 					.then(response => response.json() as Meeting[])
  	// 					.catch(this.handleError);
  	// }

  	getMeeting(id: string): Promise<Meeting> {
  		return this.getMeetings()
  					.then(meetings => meetings.find(meeting => meeting.id === id));
  	}

  	private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	}
}
