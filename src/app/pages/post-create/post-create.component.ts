import { Component, Input, OnInit } from '@angular/core';
import { ISelect } from '@core/interfaces/category';
import { categories } from '@core/values/categories';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  @Input() categorySelected: string = '';

  categories: ISelect[] = [];
  selectedCategory: string;
  constructor(private readonly router: Router) {
    this.selectedCategory = this.categorySelected;
  }

  ngOnInit(): void {
    this.categories = categories;
  }

  onChange(target: any) {
    this.selectedCategory = target.value || this.categorySelected;
    this.router.navigate([`/${target.value}`]);
  }
}
