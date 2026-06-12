import { Component, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import {

  FormBuilder,
  ReactiveFormsModule,
  Validators

} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

/* ───────────────────────────── */

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [

    CommonModule,
    ReactiveFormsModule

  ],

  templateUrl: './login.html',

  styleUrls: ['./login.scss']

})

export class Login {

  /* ───────────────────────── */

  private readonly fb =
    inject(FormBuilder);

  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);

  /* ───────────────────────── */

  loading =
    signal(false);

  errorMessage =
    signal('');

  /* ───────────────────────── */

  form = this.fb.group({

    email: [

      '',

      [

        Validators.required,
        Validators.email

      ]

    ],

    password: [

      '',

      Validators.required

    ]

  });

  /* ───────────────────────── */
  /* LOGIN                     */
  /* ───────────────────────── */

  login(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    /* ─────────────────────── */

    this.loading.set(true);

    this.errorMessage.set('');

    /* ─────────────────────── */

    this.authService.login(this.form.getRawValue() as any, {} as any

    ).subscribe({

      next: () => {

        /* Redirect */

        this.router.navigate(['/']);

      },

      error: (err) => {

        console.error(err);

        this.errorMessage.set(

          err.error?.message
          || 'Login failed'

        );

        this.loading.set(false);

      },

      complete: () => {

        this.loading.set(false);

      }

    });

  }

}