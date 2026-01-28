import { AuthResponse } from '@/types/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

const AUTH_KEY = 'auth_user';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly _user$: BehaviorSubject<AuthResponse | null> =
    new BehaviorSubject<AuthResponse | null>(this.loadFromStorage());

  // Use this to fetch user data from localStorage
  readonly user$: Observable<AuthResponse | null> = this._user$.asObservable();

  // Use this to check whether user is logged in or not
  readonly isAuthenticated$: Observable<boolean> = this.user$.pipe(
    map((user: AuthResponse | null) => !!user),
  );

  private loadFromStorage(): AuthResponse | null {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  // Use this to set user in localStorage
  setUser(user: AuthResponse): void {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    this._user$.next(user);
  }

  // Use this to clear / logged out the user
  clear(): void {
    localStorage.removeItem(AUTH_KEY);
    this._user$.next(null);
  }

  // Use this to check recent snapshot
  get snapshot(): AuthResponse | null {
    return this._user$.value;
  }
}
