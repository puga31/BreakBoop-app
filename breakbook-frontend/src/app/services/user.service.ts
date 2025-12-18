import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) { }

  // Método para obtener los headers con el token JWT
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/getall', {
      headers: this.getAuthHeaders()
    });
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/add', user, {
      headers: this.getAuthHeaders()
    });
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
