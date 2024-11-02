import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map, Observable} from "rxjs";
import { Station } from "../models/stations.model";
import {StationRaw} from "../models/stations-raw.model";

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  private apiUrl = 'https://fractalisbackend-production.up.railway.app/api/v1';

  constructor(private http: HttpClient) {
  }

  // Método para crear una estación
  createStation(station: {
    endDate: string;
    stationImage: string;
    description: string;
    stationName: string;
    userId: number;
  }): Observable<Station> {
    return this.http.post<StationRaw>(`${this.apiUrl}/station`, station).pipe(
      map(raw => this.transformToStation(raw))
    );
  }

  // Método para obtener estaciones por userId, filtrando las inválidas
  getStationByUserId(userId: number): Observable<Station[]> {
    return this.http.get<StationRaw[]>(`${this.apiUrl}/stations/userId/${userId}`).pipe(
      map(rawStations =>
        rawStations
          .filter(s => s.Id !== 0) // Filtrar estaciones con Id 0
          .map(raw => this.transformToStation(raw))
      )
    );
  }

  // Función auxiliar para transformar StationRaw a Station
  private transformToStation(raw: StationRaw): Station {
    return {
      id: raw.Id,
      userId: raw.userId,
      stationName: raw.stationName,
      description: raw.description,
      stationImage: raw.stationImage,
      startDate: new Date(raw.startDate),
      endDate: new Date(raw.endDate),
    };
  }
}
