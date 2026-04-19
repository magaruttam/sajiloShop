import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api';

export interface LoginRequest {
  email: string;
  password: string;
  vendor: 'user' | 'vendor';
}

export interface LoginResponse {
  message: string;
  user: { name: string; email: string };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'vendor';
}

export interface RegisterResponse {
  message: string;
  user: { name: string; email: string };
}

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

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${API_URL}/auth/register`, data, {
      withCredentials: true,
    });
  }
}
