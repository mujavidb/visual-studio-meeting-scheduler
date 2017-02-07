import { Component } from '@angular/core'

@Component({
	host: {'class': 'main-container'},
	selector: 'dashboard',
  	template: ` <all-meetings>Loading meetings...</all-meetings>
				<invitations>Loading invitations...</invitations>`
})

export class DashboardComponent {
}
