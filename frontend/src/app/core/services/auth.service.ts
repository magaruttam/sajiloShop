import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/auth.model';
import { LoginResponse } from '../models/auth.model';
import { RegisterRequest } from '../models/auth.model';
import { RegisterResponse } from '../models/auth.model';


const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/auth/login`, data, {
      withCredentials: true,
    });
  }

  vendorLogin(data: Pick<LoginRequest, 'email' | 'password'>): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/auth/vendor/login`, data, {
      withCredentials: true,
    });
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${API_URL}/auth/register`, data, {
      withCredentials: true,
    });
  }
}
