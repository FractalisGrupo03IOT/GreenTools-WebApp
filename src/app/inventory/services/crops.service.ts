import { Injectable } from '@angular/core'; 
import {HttpClient} from "@angular/common/http"; 
import {Observable} from "rxjs"; 
import {Plant} from "../models/plant.model";

@Injectable({
  providedIn: 'root'
})
export class CropsService {
  private apiUrl = 'https://my-json-server.typicode.com/FractalisGrupo03IOT/fakeApi/plants';

  constructor(private http: HttpClient) { }

  getPlants(station_id: number): Observable<Plant[]> {
    const url = `${this.apiUrl}?station_id=${station_id}`;
    return this.http.get<Plant[]>(url);
  }
}
