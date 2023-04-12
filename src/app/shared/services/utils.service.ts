import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UtilityService {
	constructor() {}

	formatDate(formControl): string {
		let dateControl, date, moment, splitChar;

		dateControl = formControl;
		moment = require('moment');
		if (dateControl.value && moment.isMoment(dateControl.value)) {
			let dateString = dateControl.value._i;
			if (
				String(dateString).match(
					/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
				)
			) {
				if (dateString.indexOf('.') > 0) {
					splitChar = '.';
				} else if (dateString.indexOf('/') > 0) {
					splitChar = '/';
				} else if (dateString.indexOf('-') > 0) {
					splitChar = '-';
				}
				let dateParts = dateString.split(splitChar);
				if (dateParts.length === 3) {
					let dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
					date = dateObject.getDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear();
					dateControl.value._i = date;
					return dateControl.value;
				}
			}
		}
	}

	validateEmail(email): boolean {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
}
