import { Observable } from 'rxjs';
import { CreateUserPayload, UsersRepository } from '.';
import { User } from '@core/models/user';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '@core/models/posts';

export class UserPlaceholderRepository implements UsersRepository {
  private readonly url = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);

  public createUser(payload: CreateUserPayload): Observable<User> {
    return this.http.post<User>(this.url, payload);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  public getUserPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/${userId}/posts`);
  }

  public updateUser(payload: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.url}/${payload.id}`, payload);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
