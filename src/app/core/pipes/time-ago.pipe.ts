import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const timeDifference = Date.now() - new Date(value).getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (hoursDifference < 24) {
      return 'Vài giờ trước';
    } else {
      return `${dayDifference} ngày trước`;
    }
  }
}
