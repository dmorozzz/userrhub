import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { User } from '@core/models/user';

@Component({
  selector: 'app-user-controller',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './user-controller.component.html',
  styleUrl: './user-controller.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserControllerComponent {
  @Input({ required: true }) public user!: User;
  @Output() delete = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>();
}
