import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preformattedText'
})
export class PreformattedTextPipe implements PipeTransform {

  transform(value: string): unknown {
    return value.replace(/(\\r\\n)|([\r\n])/gmi, '<br/>');
  }

}
