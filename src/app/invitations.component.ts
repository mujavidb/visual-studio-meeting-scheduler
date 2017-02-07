import { Component, OnInit } from '@angular/core'
import { Meeting } from './meeting'

@Component({
	host: {'class': 'large_card_area invitations'},
	selector: 'invitations',
  	templateUrl: './invitations.component.html'
})

export class InvitationsComponent {
	invitations: Meeting[]

	ngOnInit() {
		this.invitations = [
			{
				"id"			: "2",
				"name"			: "Weekly Standup",
				"time"			: "",
				"description"	: "Example description",
				"location"		: "Break room",
				"minutes"		: "This is what we talked about",
				"agenda"		: "This is what we talked about"
			}
		];
	}
}
