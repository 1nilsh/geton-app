import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sToHms'
})
export class SToHmsPipe implements PipeTransform {
  transform(seconds: number, ...args: unknown[]): string {
    if (isNaN(seconds)) {
      return '00:00';
    }

    seconds = Math.round(seconds);

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    let timeString = '';
    timeString += (h === 0 ? '' : (h < 10 ? '0' + h : h) + ':');
    timeString += (m < 10 ? '0' + m : m) + ':';
    timeString += (s < 10 ? '0' + s : s);

    return timeString;
  }
}
