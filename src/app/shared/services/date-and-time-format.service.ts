import { Injectable } from '@angular/core';
import { UtcToLocalTime } from '../../shared/pipes/utc-to-local-time.pipe.ts.pipe';

@Injectable({
	providedIn: 'root',
})
export class DateAndTimeFormatService {
	constructor(private utcToLocalTime: UtcToLocalTime) {}

	getDateAndTime(date) {
		let local = this.utcToLocalTime.transform(date, 'full');

		const convertedDate = this.padTo2Digits(+local.slice(8, 10));

		const monthInStr = local.slice(4, 7);

		let convertedMonth;
		switch (monthInStr) {
			case 'Jan':
				convertedMonth = '01';
				break;
			case 'Feb':
				convertedMonth = '02';
				break;
			case 'Mar':
				convertedMonth = '03';
				break;
			case 'Apr':
				convertedMonth = '04';
				break;
			case 'May':
				convertedMonth = '05';
				break;
			case 'Jun':
				convertedMonth = '06';
				break;
			case 'Jul':
				convertedMonth = '07';
				break;
			case 'Aug':
				convertedMonth = '08';
				break;
			case 'Sep':
				convertedMonth = '09';
				break;
			case 'Oct':
				convertedMonth = '10';
				break;
			case 'Nov':
				convertedMonth = '11';
				break;
			default:
				convertedMonth = '12';
		}

		const convertedYear = local.slice(11, 15);

		const convertedTime = this.timeConvert(local.slice(16, 21));

		const lastLoginTime = convertedDate + '/' + convertedMonth + '/' + convertedYear + ' | ' + convertedTime;

		return lastLoginTime;
	}

	padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}

	timeConvert(time) {
		// Check correct time format and split into components
		time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

		if (time.length > 1) {
			// If time format correct
			time = time.slice(1); // Remove full string match value
			time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
			time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join(''); // return adjusted time or original string
	}
}
