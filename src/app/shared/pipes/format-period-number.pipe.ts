import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'formatPeriodNumber' })
export class FormatPeriodNumberPipe implements PipeTransform {

    transform(order: any): string {
        const numericValue = (order) ? parseInt(order, 10) : NaN;
        if (!isNaN(numericValue)) {
            // 10-20 numbers all end with 'th' so no need to check anything else
            const twoDigit = numericValue % 100;
            if (twoDigit > 9 && twoDigit < 20) {
                return order + 'th';
            }

            switch (numericValue % 10) {
                case 1:
                    return order + 'st';
                case 2:
                    return order + 'nd';
                case 3:
                    return order + 'rd';
                default:
                    return order + 'th';
            }
        }
        return order;
    }
}
