import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://192.168.1.22:8080/api'; // ⚠️ backend URL

  constructor(private http: HttpClient) {}

  // registerDoctor(data: any): Observable<any> {
  //   return this.http.get(this.apiUrl, data);
  // }
  getDoctors() {
    return this.http.get(this.apiUrl + '/doctors/all');
  }
  getUsers() {
    return this.http.get(this.apiUrl + '/auth/users');
  }
  getDoctor() {
    return this.http.get(this.apiUrl + '/doctors/956335d4-1eee-49b0-ae0d-b1ed77d0903e');
  }
  getDoctorById(id: string) {
    return this.http.get(`${this.apiUrl}/doctors/${id}`);
  }
   getscheduleById(id: string) {
    return this.http.get(`${this.apiUrl}/doctors/${id}/schedules`);
  }
  // getresults(){
  //   return this.http.get(this.apiUrl +'/lab-result/all');
  // }

  getLabResults(patientId: string) {
  return this.http.get<any[]>(`${this.apiUrl}/lab-result/patient/${patientId}`);
}
getLabResultDetails(labResultId: string) {
  return this.http.get<any>(
    `${this.apiUrl}/lab-result/view/${labResultId}`
  );
}

  // getPatientByDrId(){
  //   return this.http.get(this.apiUrl +'/lab-result/{patientId}')
  // }
  

  // saveUser(){
  //   return this.http.post(this.apiUrl + '/register');
  // }
  registerUser(data: any) {
    return this.http.post(this.apiUrl + '/auth/register', data);
  }
  registerDoctor(data: any) {
    return this.http.post(this.apiUrl + '/doctors/register', data);
  }
  registerSchedule(id: string, data: any) {
  return this.http.post(`${this.apiUrl}/doctors/${id}/schedules`, data);
}

bookConsultation(doctorId: string, patientId: string, data: any) {
  return this.http.post(
    `${this.apiUrl}/doctors/${doctorId}/book_consultation/${patientId}`,
    data
  );
}
}
