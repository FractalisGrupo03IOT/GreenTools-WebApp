import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plant} from "../models/plant.model";

@Injectable({
  providedIn: 'root'
})
export class CropsService {
  private apiUrl = 'https://fractalisbackend-production.up.railway.app/api/v1';

  constructor(private http: HttpClient) {}

  addPlant(plant: Plant): Observable<Plant> {
    return this.http.post<Plant>(`${this.apiUrl}/plant`, plant);
  }

  getPlants(stationId: number): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.apiUrl}/plants/${stationId}`);
  }
}
