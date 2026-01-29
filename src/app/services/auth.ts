import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthStore } from '@/store/auth';
import { AuthResponse, LoginPayload, RegisterPayload, User } from '@/types/auth';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL: string = `${environment.apicall}/auth`;

  constructor(
    private http: HttpClient,
    private authStore: AuthStore,
  ) {}

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, payload).pipe(
      tap((res) => {
        if (!res.data) {
          return;
        }
        return this.authStore.setUser(res.data);
      }),
    );
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, payload).pipe(
      tap((res) => {
        if (!res.data) {
          return;
        }
        return this.authStore.setUser(res.data);
      }),
    );
  }

  // fetchUser(): Observable<AuthResponse> {
  //   return this.http.get<AuthResponse>(`${this.API_URL}/me`).pipe(
  //     tap((res) => {
  //       if (!res.data) {
  //         return;
  //       }
  //       let lastUser: User | null = null;
  //       this.authStore.user$.subscribe((user) => {
  //         if (!user) {
  //           return;
  //         }
  //         lastUser = user;
  //       });

  //       if (!lastUser) {
  //         return this.authStore.setUser(res.data);
  //       }

  //       const { token } = lastUser;
  //       res.data.token = token;
  //       return this.authStore.setUser(res.data);
  //     }),
  //   );
  // }

  fetchUser(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.API_URL}/me`).pipe(
      tap((res) => {
        if (!res?.data) return;

        const existingUser = this.authStore.snapshot;

        this.authStore.setUser({
          ...res.data,
          token: existingUser?.token ?? res.data.token,
        });
      }),
    );
  }

  logout(): void {
    this.authStore.clear();
  }
}
