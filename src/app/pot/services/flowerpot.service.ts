import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment.development"
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { FlowerpotResponse, SensorResponse } from '../models/flowerpot.model';

@Injectable({
  providedIn: 'root'
})
export class FlowerpotService {

  baseUrl = environment.api + "flowerpots"

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(
        `An error occurred ${error.status}, body was: ${error.error.message}`
      );
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error.message}`
      );
    }
    return throwError(() => ({ status: error.status, message: error.error.message }))
  }

  getFlowerpotById(flowerpotId: number): Observable<FlowerpotResponse> {
    return this.http
      .get<FlowerpotResponse>(`${this.baseUrl}/${flowerpotId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getFlowerpotByCode(code: string): Observable<FlowerpotResponse> {
    return this.http
      .post<FlowerpotResponse>(`${this.baseUrl}/code`, code, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getTemperatureSensors(flowerpotId: number): Observable<SensorResponse[]> {
    return this.http
      .get<SensorResponse[]>(`${this.baseUrl}/${flowerpotId}/temperature/sensors`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getHumiditySensors(flowerpotId: number): Observable<SensorResponse[]> {
    return this.http
      .get<SensorResponse[]>(`${this.baseUrl}/${flowerpotId}/humidity/sensors`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getSunlightSensors(flowerpotId: number): Observable<SensorResponse[]> {
    return this.http
      .get<SensorResponse[]>(`${this.baseUrl}/${flowerpotId}/sunlight/sensors`)
      .pipe(retry(2), catchError(this.handleError));
  }
}