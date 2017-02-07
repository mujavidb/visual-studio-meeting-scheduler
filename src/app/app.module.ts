import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { AllMeetingsComponent } from './all-meetings.component'
import { InvitationsComponent } from './invitations.component'
import { CreateMeetingComponent } from './create-meeting.component'
import { SingleMeetingComponent } from './single-meeting.component'
import { DashboardComponent } from './dashboard.component'


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AllMeetingsComponent,
    InvitationsComponent,
    CreateMeetingComponent,
    SingleMeetingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'create-meeting',
        component: CreateMeetingComponent
      },
      {
        path: 'single-meeting/:id',
        component: SingleMeetingComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
