import { Pipe } from '@angular/core';
declare var moment: any;

@Pipe({
	name: 'timeFilter',
	pure: false
})

export class TimeFilterPipe {
	transform(arr: any[], upcoming: boolean): any[] {
		if(!arr) return [];
		return arr.filter((eachItem: any) => {
			if(!eachItem.time) {
				return upcoming;
			} else {
				var time: any = new moment(eachItem.time);
			}
			var now: any = new moment();

			if(upcoming) {
				return time.isAfter(now);
			} else {
				return time.isBefore(now);
			}
	        
		});
	}
}