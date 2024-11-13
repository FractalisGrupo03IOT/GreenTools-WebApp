// src/app/inventory/services/crop-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface CropData {
  plantId: number;
  humidity: number;
  temperature: number;
  uv: number;
}

@Injectable({
  providedIn: 'root'
})
export class CropDataService {
  private apiUrl = 'https://fractalisbackend-production.up.railway.app/api/v1/cropData';

  constructor(private http: HttpClient) {}

  // Método para activar el sensor de una planta específica (POST)
  activateSensor(plantId: number): Observable<any> {
    const payload = {
      plantId: plantId,
      humidity: 0,
      temperature: 0,
      uv: 0
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, payload, { headers });
  }

  // Método para obtener cropData por plantId (GET)
  getCropDataByPlantId(plantId: number): Observable<CropData | null> {
    const url = `${this.apiUrl}/${plantId}`;
    return this.http.get<CropData[]>(url).pipe(
      map(response => (response.length > 0 ? response[0] : null)),
      catchError(error => {
        if (error.status === 404) {
          // Si no existe cropData, retornamos null
          return of(null);
        } else {
          // Para otros errores, retornamos null o maneja según sea necesario
          console.error(`Error al obtener cropData para la planta ${plantId}:`, error);
          return of(null);
        }
      })
    );
  }
}
