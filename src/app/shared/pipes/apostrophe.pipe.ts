import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'apostrophe',
})
export class ApostrophePipe implements PipeTransform {
    transform(val: number, ...args: any[]): string {
        if (val !== undefined && val !== null) {
            // here we just remove the commas from value
            return val.toString().replace(/,/g, '\'');
        } else {
            return '';
        }
    }
}
