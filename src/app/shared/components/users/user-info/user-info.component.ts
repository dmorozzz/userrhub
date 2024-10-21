import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@core/models/user';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  @Input({ required: true }) user!: User;
}
