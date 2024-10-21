import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '@core/models/posts';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent {
  @Input({ required: true }) public posts!: Post[];
}
