import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { User } from '@core/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input({ required: true }) public users!: User[];
  @Output() public select = new EventEmitter<User>();

  public displayedColumns = ['id', 'username', 'email', 'actions'];
}
