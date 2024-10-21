import { Post } from './posts';

export interface User {
  id: number;
  name: string;
  email: string;
  posts?: Post[];
}
