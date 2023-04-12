import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'truncate' })
export class  TruncatePipe  implements PipeTransform {

    transform(value: string, size: number=10): string {
        if(value.length>size){
            let text= value.slice(0,size-2)+'...';
            return text;
        }
        return value;
    }
}
