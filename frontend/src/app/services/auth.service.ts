import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl // Replace with your backend URL
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}
  private getLocalStorage() {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      return localStorage;
    }
    return null;
  }
  login(credentials: { email: string; password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      map((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const localStorage = this.getLocalStorage();
    const token = localStorage ? localStorage.getItem('token') : null;
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentUser(): any {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }
}
