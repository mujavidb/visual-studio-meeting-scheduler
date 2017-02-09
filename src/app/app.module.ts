import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { CalendarComponent } from './calendar'
import { AppComponent } from './app.component'
import { AllMeetingsComponent } from './all-meetings.component'
import { InvitationsComponent } from './invitations.component'
import { CreateMeetingComponent } from './create-meeting.component'
import { SingleMeetingComponent } from './single-meeting.component'
import { DashboardComponent } from './dashboard.component'

import { TimeFilterPipe } from './time-filter.pipe'
import { FormatTimePipe } from './format-time.pipe'


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AllMeetingsComponent,
    InvitationsComponent,
    CreateMeetingComponent,
    SingleMeetingComponent,
    CalendarComponent,
    TimeFilterPipe,
    FormatTimePipe
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
