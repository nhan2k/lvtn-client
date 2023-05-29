import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postStatus',
})
export class postStatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value === 'hide' ? 'Đang ẩn' : 'Đang hiện';
  }
}

@Pipe({
  name: 'postIsReview',
})
export class postIsReviewPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value ? 'Đã duyệt' : 'Chưa duyệt';
  }
}
