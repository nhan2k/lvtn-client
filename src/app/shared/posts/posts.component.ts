import { Component, Input } from '@angular/core';
import { environment } from '@environment/environment.development';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  @Input() posts: any[] = [];
  @Input() title: string = '';

  endpointURL: string = environment.imgUrl;
}
