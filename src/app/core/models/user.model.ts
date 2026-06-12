export type UserRole =
  | 'Admin'
  | 'Manager'
  | 'Operator';

export interface User {

  id: number;

  fullName: string;

  email: string;

  role: UserRole;

  assignedJobs?: number[];

}