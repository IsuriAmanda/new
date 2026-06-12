import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.scss'],
})
export class EditUser {
  user = {
    fullName: 'Kavindu Silva',
    email: 'kavindu@harshanaprinters.lk',
    phone: '077 456 7890',
    role: 'Operator',
    department: 'Printing',
    status: 'Active',
  };

  roles = ['Admin', 'Manager', 'Operator'];
  departments = ['Administration', 'Production', 'Printing', 'Cutting', 'Binding', 'Packing'];
}
