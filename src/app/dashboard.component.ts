import { Component } from '@angular/core'

@Component({
	host: {'class': 'main-container'},
	selector: 'dashboard',
  	template: ` <all-meetings (onClickedPast)="onClickedPast($event)" [ngClass]="{'past': clickedPast }">Loading meetings...</all-meetings>
				<invitations>Loading invitations...</invitations>`
})

export class DashboardComponent {
	clickedPast : boolean = false;

	onClickedPast(clickedPast: boolean) : void {
		this.clickedPast = clickedPast;
	}
}
