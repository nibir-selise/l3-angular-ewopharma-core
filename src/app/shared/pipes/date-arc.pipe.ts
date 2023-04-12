import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ARC_CONFIG } from '../../arc-config/constant/arc-config.constant';

@Pipe({ name: 'dateArc' })
export class DateArcPipe implements PipeTransform {

    transform(inputDate: Date | string, format: string = ARC_CONFIG.DateFormat): string {
        if (inputDate) {
            const date = new Date(inputDate);
            return new DatePipe('en-US').transform(date, format);
        }

        return '';
    }
}
