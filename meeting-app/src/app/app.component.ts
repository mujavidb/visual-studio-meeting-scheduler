import { Component, OnInit } from '@angular/core';
import { Meeting } from './meeting';

@Component({
	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})

export class AppComponent {
	meetings: Meeting[];

	ngOnInit() {
		this.meetings = [{"name":"Plan Client Presentation", "time":"Tuesday 2nd February at 14:30", "description":"Example description", "location":"MPEB 6.21, UCL", "minutes":"This is what we talked about", "agenda":"This is what we talked about"}];
	}
}
