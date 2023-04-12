import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'secondsToTimePipe' })
export class SecondsToTimePipe implements PipeTransform {
	transform(value: number, exponent?: number): string {
		return moment.utc(moment.duration(value, 'seconds').as('milliseconds')).format('HH:mm');
	}
}
