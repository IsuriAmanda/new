import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.scss'],
})
export class CreateUser {
  user = {
    fullName: '',
    email: '',
    phone: '',
    role: 'Operator',
    department: 'Printing',
    status: 'Active',
    temporaryPassword: '',
  };

  roles = ['Admin', 'Manager', 'Operator'];
  departments = ['Administration', 'Production', 'Printing', 'Cutting', 'Binding', 'Packing'];
}
