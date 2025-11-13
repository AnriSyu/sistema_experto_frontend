import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rule } from '../models/rule';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private apiUrl = `${environment.apiUrl}/rules`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Rule[]> {
    return this.http.get<Rule[]>(this.apiUrl);
  }

  getById(id: number): Observable<Rule> {
    return this.http.get<Rule>(`${this.apiUrl}/${id}`);
  }

  create(rule: Rule): Observable<Rule> {
    return this.http.post<Rule>(this.apiUrl, rule);
  }

  update(id: number, rule: Rule): Observable<Rule> {
    return this.http.put<Rule>(`${this.apiUrl}/${id}`, rule);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
