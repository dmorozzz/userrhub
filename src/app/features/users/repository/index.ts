import { Observable } from 'rxjs';
import { User } from '@core/models/user';
import { InjectionToken } from '@angular/core';
import { Post } from '@core/models/posts';

export type CreateUserPayload = Omit<User, 'id'>;
export type UpdateUserPayload = Partial<User>;

export interface UsersRepository {
  createUser(payload: CreateUserPayload): Observable<User>;
  getAllUsers(): Observable<User[]>;
  getUserPosts(userId: number): Observable<Post[]>;
  updateUser(payload: UpdateUserPayload): Observable<User>;
  deleteUser(id: number): Observable<void>;
}

export const USERS_REPOSITORY = new InjectionToken<UsersRepository>(
  'users-repository',
);

export type CreateUserPostPayload = Omit<Post, 'id'>;
export type UpdateUserPostPayload = Partial<Post>;

export interface UserPostsRepository {
  createUserPost(payload: CreateUserPostPayload): Observable<Post>;
  updateUserPost(payload: UpdateUserPostPayload): Observable<Post>;
  getUserPosts(id: number): Observable<Post[]>;
  deleteUserPost(id: number): Observable<void>;
}

export const USER_POSTS_REPOSITORY = new InjectionToken<UserPostsRepository>(
  'user-post-repository',
);
