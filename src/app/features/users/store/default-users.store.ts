import { inject } from '@angular/core';
import { UsersState, UsersStateStatus, UsersStore } from '.';
import { USERS_REPOSITORY } from '../repository';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from '@core/models/user';
import { Post } from '@core/models/posts';

export class DefaultUsersStore implements UsersStore {
  private repository = inject(USERS_REPOSITORY);

  private readonly initalState: UsersState = {
    loadStatus: 'NOT_LOADED',
    users: [],
    error: null,
  };

  private readonly state = new BehaviorSubject<Readonly<UsersState>>(
    this.initalState,
  );

  private getCurrentState(): UsersState {
    return { ...this.state.getValue() };
  }

  private updateUsers(users: User[]): void {
    const state = this.getCurrentState();
    state.users = users;
    this.state.next(state);
  }

  private updateLoadStatus(status: UsersStateStatus): void {
    const state = this.getCurrentState();
    state.loadStatus = status;
    this.state.next(state);
  }

  private updateError(error: string | null): void {
    const state = this.getCurrentState();
    state.error = error;
    this.state.next(state);
  }

  private updateUserPosts(userId: number, posts: Post[]): void {
    const state = this.getCurrentState();

    state.users = state.users.map((user) => {
      if (user.id === userId) {
        user.posts = posts;
      }

      return user;
    });

    this.state.next(state);
  }

  public getUsers(): Observable<User[]> {
    return this.state.pipe(map((state) => state.users));
  }

  public getError(): Observable<string | null> {
    return this.state.pipe(map((state) => state.error));
  }

  public getLoadStatus(): Observable<UsersStateStatus> {
    return this.state.pipe(map((state) => state.loadStatus));
  }

  public load(): void {
    this.updateLoadStatus('LOADING');
    this.updateError(null);

    this.repository
      .getAllUsers()
      .pipe(take(1))
      .subscribe({
        next: (users) => {
          this.updateUsers(users);
          this.updateLoadStatus('LOADED');
        },
        error: () => {
          this.updateError('Something went wrong');
          this.updateLoadStatus('NOT_LOADED');
        },
      });
  }

  public loadPosts(userId: number): void {
    this.repository
      .getUserPosts(userId)
      .pipe(take(1))
      .subscribe((posts) => this.updateUserPosts(userId, posts));
  }

  public deleteUser(id: number): void {
    const oldUsers = this.state.getValue().users;
    this.updateUsers(oldUsers.filter((user) => user.id !== id));
    this.repository
      .deleteUser(id)
      .pipe(take(1))
      .subscribe({
        error: () => {
          this.updateUsers(oldUsers);
        },
      });
  }

  public updateUser(user: User): void {
    const oldUsers = this.state.getValue().users;
    this.updateUsers(
      oldUsers.map((oldUser) => {
        if (oldUser.id === user.id) {
          return user;
        }

        return oldUser;
      }),
    );

    this.repository
      .updateUser(user)
      .pipe(take(1))
      .subscribe({
        error: () => {
          this.updateUsers(oldUsers);
        },
      });
  }
}
