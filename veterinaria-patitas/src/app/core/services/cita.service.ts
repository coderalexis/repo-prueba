import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '@models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) {}

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  deleteCita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCita(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, cita);
  }
  getAvailableSlots(date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/available-slots`, {
      params: { date }
    });
  }
}
