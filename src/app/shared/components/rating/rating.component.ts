import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() currentRating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  // Rating selection method
  selectRating(rating: number): void {
    this.currentRating = rating;
    this.ratingChange.emit(this.currentRating);
  }
}
