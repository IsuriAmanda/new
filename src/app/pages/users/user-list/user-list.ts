import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  User,
  UserRole
}
from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserList {

  readonly users =
    signal<User[]>([

      {
        id: 1,
        fullName: 'Admin User',
        email: 'admin@test.com',
        role: 'Admin'
      },

      {
        id: 2,
        fullName: 'Production Manager',
        email: 'manager@test.com',
        role: 'Manager'
      },

      {
        id: 3,
        fullName: 'Machine Operator',
        email: 'operator@test.com',
        role: 'Operator'
      }

    ]);

  readonly roles: UserRole[] = [
    'Admin',
    'Manager',
    'Operator'
  ];

}