import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
} from '@angular/core';
import { USERS_STORE } from './store';
import { DefaultUsersStore } from './store/default-users.store';
import { USERS_REPOSITORY, USER_POSTS_REPOSITORY } from './repository';
import { UserPlaceholderRepository } from './repository/placeholder-users.repository';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { UsersListComponent } from '../../shared/components/users/users-list/users-list.component';
import { AsyncPipe } from '@angular/common';
import { User } from '@core/models/user';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserInfoComponent } from '../../shared/components/users/user-info/user-info.component';
import { UserControllerComponent } from '../../shared/components/users/user-controller/user-controller.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../../shared/components/users/delete-user-dialog/delete-user-dialog.component';
import { UpdateUserDialogComponent } from '../../shared/components/users/update-user-dialog/update-user-dialog.component';
import { PostsListComponent } from '../../shared/components/posts/posts-list/posts-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UsersListComponent,
    MatSidenavModule,
    AsyncPipe,
    UserInfoComponent,
    UserControllerComponent,
    PostsListComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [
    { provide: USERS_STORE, useClass: DefaultUsersStore },
    { provide: USERS_REPOSITORY, useClass: UserPlaceholderRepository },
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatDrawer) public drawer!: MatDrawer;
  private usersStore = inject(USERS_STORE);
  private dialog = inject(MatDialog);
  private selectedUserSubject = new BehaviorSubject<User | null>(null);

  public selectedUser$ = this.selectedUserSubject.pipe(takeUntilDestroyed());
  public users$ = this.usersStore.getUsers();
  public loadStatus$ = this.usersStore.getLoadStatus();
  public error$ = this.usersStore.getError();

  constructor() {
    this.usersStore.load();
  }

  ngAfterViewInit(): void {
    this.selectedUser$.subscribe((selectedUser) => {
      if (!selectedUser) {
        this.drawer.close();
        return;
      }

      this.drawer.open();
    });
  }

  public selectUser(user: User): void {
    this.usersStore.loadPosts(user.id);
    this.selectedUserSubject.next(user);
  }

  public clearSeletedUser(): void {
    this.selectedUserSubject.next(null);
  }

  public deleteUser(user: User): void {
    this.dialog
      .open(DeleteUserDialogComponent, { data: { user } })
      .afterClosed()
      .subscribe(({ confirmed }: { confirmed: boolean }) => {
        if (!confirmed) {
          return;
        }
        this.clearSeletedUser();
        this.usersStore.deleteUser(user.id);
      });
  }

  public updateUser(user: User): void {
    this.dialog
      .open(UpdateUserDialogComponent, {
        data: { user },
        maxWidth: '500px',
        width: '100%',
      })
      .afterClosed()
      .subscribe((data: { confirmed: boolean; user: User }) => {
        if (!data.confirmed) {
          return;
        }
        this.selectUser({ ...data.user });
        this.usersStore.updateUser(data.user);
      });
  }
}
