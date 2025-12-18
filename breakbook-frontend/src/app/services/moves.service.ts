import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoveService {
  private apiUrl = '/api/moves';  

  constructor(private http: HttpClient) { }

  // Obtener todos los movimientos
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/getall');
  }

  // Agregar un nuevo movimiento
  addMove(move: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/add', move);
  }

  // Parfa eliminar un movimiento por id
  deleteMove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Para actualizar un movimiento por id
  updateMove(id: number, move: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, move);  
  }
}

