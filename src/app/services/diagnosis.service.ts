import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Diagnosis } from '../models/diagnosis.model';
import { ExpertFormPayload } from '../models/expert-answer.model';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getDiagnosesByStudentId(studentId: number): Observable<Diagnosis[]> {
    return this.http.get<Diagnosis[]>(`${this.apiUrl}/students/${studentId}/diagnoses`);
  }

  generateDiagnosis(studentId: number): Observable<Diagnosis> {
    return this.http.post<Diagnosis>(`${this.apiUrl}/diagnosis/${studentId}`, {});
  }

  submitExpertAnswers(studentId: number, answers: { exerciseNumber: number; answer: string }[]): Observable<Diagnosis[]> {
    const payload = { studentId, answers }; // ✅ envolverlo en un objeto
    return this.http.post<Diagnosis[]>(
        `${this.apiUrl}/students/${studentId}/metrics`,
        payload
    );
  }



}
