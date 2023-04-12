import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'truncateavatar' })
export class  AvatarNameTruncatePipe  implements PipeTransform {

    transform(value: string, size: number=3): string {
        return value.split(/\s+/i).slice(0,size).join(' ')
    }
}