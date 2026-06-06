import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  // ชี้ไปยัง URL ของ Spring Boot
  private apiUrl = 'http://localhost:8080/api/v1/patients';

  // Inject HttpClient เข้ามาใช้งาน
  constructor(private http: HttpClient) {}

  // 1. ฟังก์ชันดึงรายชื่อผู้ป่วยทั้งหมด
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  // 2. ฟังก์ชันลงทะเบียนผู้ป่วยใหม่
  registerPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  // 3. ฟังก์ชันอัปเดตสถานะ
  updateStatus(id: number, status: string): Observable<Patient> {
    return this.http.patch<Patient>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }

  // 4. ฟังก์ชันลบผู้ป่วย
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
