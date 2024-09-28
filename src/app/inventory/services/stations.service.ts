import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Station} from "../models/stations.model";

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  private apiUrl = 'https://my-json-server.typicode.com/FractalisGrupo03IOT/fakeApi/stations';

  constructor(private http: HttpClient) {}

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.apiUrl);
  }
}
