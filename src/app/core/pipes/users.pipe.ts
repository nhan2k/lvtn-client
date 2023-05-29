import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus',
})
export class userStatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return value === 'active' ? 'Hoạt động' : 'Không hoạt động';
  }
}
