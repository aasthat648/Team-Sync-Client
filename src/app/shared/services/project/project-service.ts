import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  api = environment.apicall;

  createProject(
    workspaceId: string,
    data: { title: string; description?: string; imageUrl?: string }
  ): Observable<any> {
    return this.http.post<any>(`${this.api}/projects/${workspaceId}`, data, {
      withCredentials: true,
    });
  }
}