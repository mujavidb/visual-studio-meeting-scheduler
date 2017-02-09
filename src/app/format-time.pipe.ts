import { Pipe } from '@angular/core';
declare var moment: any;

@Pipe({
	name: 'formatTime',
	pure: false
})

export class FormatTimePipe {
	transform(time: string): string {
		return time ? new moment(time).format("dddd Do MMMM HH:mm") : "Time TBC";
	}
}