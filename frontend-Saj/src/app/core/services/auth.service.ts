import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/auth.model';
import { LoginResponse } from '../models/auth.model';
import { RegisterRequest } from '../models/auth.model';
import { RegisterResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, data, {
      withCredentials: true,
    });
  }

  vendorLogin(data: Pick<LoginRequest, 'email' | 'password'>): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/vendor/login`, data, {
      withCredentials: true,
    });
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/register`, data, {
      withCredentials: true,
    });
  }
}
