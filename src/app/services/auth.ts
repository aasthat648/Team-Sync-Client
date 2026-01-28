import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthStore } from '@/store/auth';
import { LoginRequest, AuthResponse, RegisterRequest } from '@/types/auth';
import { environment } from 'src/environment/environment.example';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL: string = environment.apicall;

  constructor(
    private http: HttpClient,
    private authStore: AuthStore,
  ) {}

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, payload)
      .pipe(tap((user: AuthResponse) => this.authStore.setUser(user)));
  }

  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, payload)
      .pipe(tap((user: AuthResponse) => this.authStore.setUser(user)));
  }

  fetchUser(): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(`${this.API_URL}/me`)
      .pipe(tap((user: AuthResponse) => this.authStore.setUser(user)));
  }

  logout(): void {
    this.authStore.clear();
  }
}
