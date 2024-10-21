import { InjectionToken } from '@angular/core';
import { Post } from '@core/models/posts';
import { User } from '@core/models/user';
import { Observable } from 'rxjs';

export type UsersStateStatus = 'NOT_LOADED' | 'LOADING' | 'LOADED';

export interface UsersState {
  loadStatus: UsersStateStatus;
  users: User[];
  error: string | null;
}

export interface UsersStore {
  load(): void;
  loadPosts(userId: number): void;
  getUsers(): Observable<User[]>;
  getError(): Observable<string | null>;
  getLoadStatus(): Observable<UsersStateStatus>;
  updateUser(user: User): void;
  deleteUser(id: number): void;
}

export const USERS_STORE = new InjectionToken<UsersStore>('users-store');
