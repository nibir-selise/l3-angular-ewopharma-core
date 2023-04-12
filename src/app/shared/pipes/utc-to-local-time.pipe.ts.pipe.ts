import { Pipe, PipeTransform } from '@angular/core';
import { UtcToLocalConverterService } from '../services/utc-to-local-converter.service';

@Pipe({
	name: 'utcToLocalTime',
})
export class UtcToLocalTime implements PipeTransform {
	constructor(private _dateConverter: UtcToLocalConverterService) {}

	transform(date: string, args?: any): string {
		return this._dateConverter.convertUtcToLocalTime(date, args);
	}
}
