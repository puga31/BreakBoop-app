import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RoundCreateRequest {
  userId: number;
  name: string;
  moveIds: number[];
}

interface RoundUpdateRequest {
  id: number;
  userId: number;
  name: string;
  moveIds: number[];
}

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  private apiUrl = 'http://localhost:8080/api/rounds';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createRound(data: RoundCreateRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data, {
      headers: this.getAuthHeaders()
    });
  }

  getRoundsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateRound(data: RoundUpdateRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${data.id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  deleteRound(roundId: number, userId: number): Observable<string> {
    
    return this.http.delete(`${this.apiUrl}/delete/${roundId}?userId=${userId}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' 
    });
  }
}
