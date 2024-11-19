import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CropChartData} from "../models/cropChartData";
import {Plant} from "../../inventory/models/plant.model";



@Injectable({
  providedIn: 'root'
})
export class PlantDataService {
  private apiUrl = 'https://fractalisbackend-production.up.railway.app/api/v1';

  constructor(private http: HttpClient) { }

  getCropDataByPlantId(plantId: number){
    return this.http.get<CropChartData[]>(`${this.apiUrl}/lastMonthCropData/${plantId}`);
  }

  getPlantById(plantId: number) {
    return this.http.get<Plant>(`${this.apiUrl}/plant/${plantId}`);
  }

  getAllCropDataByPlantId(plantId: number){
    return this.http.get<CropChartData[]>(`${this.apiUrl}/cropData/${plantId}`);
  }
}
