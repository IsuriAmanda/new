import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl ='http://localhost:3000/api/auth';
  private userSubject = new BehaviorSubject<any>(null);
  user$ =this.userSubject.asObservable();

  

  constructor(
    private http: HttpClient
  ) {}

  

  login(
    email: string,
    password: string
  ) {

    return this.http.post<any>(

      `${this.baseUrl}/login`,

      {
        email,
        password
      }

    ).pipe(

      tap(res => {

       

        localStorage.setItem(
          'token',
          res.token
        );

       

        localStorage.setItem(
          'user',
          JSON.stringify(res.user)
        );

        

        this.userSubject.next(
          res.user
        );

      })

    );

  }



  logout() {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    this.userSubject.next(null);

  }


getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

getUser() {
  if (typeof window === 'undefined') return null;
  return JSON.parse(localStorage.getItem('user') || 'null');
}

isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
}

  }

  