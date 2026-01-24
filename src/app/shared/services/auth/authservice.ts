import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export type RegisterType = {
  name: string;
  email: string;
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  constructor(private http: HttpClient) {}

  api = environment.apicall;

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/auth/login`, {
      email,
      password,
    });
  }
  register(data: RegisterType): Observable<any> {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  user() {
    return this.http.get(`${this.api}/auth/me`);
  }
}
