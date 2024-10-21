import { Routes } from '@angular/router';
import { UsersComponent } from './features/users/users.component';

export const routes: Routes = [
  { path: '', loadComponent: () => UsersComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
