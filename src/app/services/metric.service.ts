import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Metric } from '../models/metric.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricService {
  private apiUrl = `${environment.apiUrl}/metrics`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Metric[]> {
    return this.http.get<Metric[]>(this.apiUrl);
  }

  getById(id: number): Observable<Metric> {
    return this.http.get<Metric>(`${this.apiUrl}/${id}`);
  }

  create(metric: Metric): Observable<Metric> {
    return this.http.post<Metric>(this.apiUrl, metric);
  }

  update(id: number, metric: Metric): Observable<Metric> {
    return this.http.put<Metric>(`${this.apiUrl}/${id}`, metric);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
