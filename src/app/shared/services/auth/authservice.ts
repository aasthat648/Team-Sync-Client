import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  constructor(private http: HttpClient) {}

  api = 'http://192.168.243.137:8080/api/v1/tenants/auth';

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/login`, {
      email,
      password,
    });
  }
  register(name: string, username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/register`, { name, username, email, password });
  }
}
