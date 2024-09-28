import { Component, OnInit } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";

interface DataEntry {
  fecha: string;
  humedad: number;
  uvSolar: number;
  temperatura: number;
}

@Component({
  selector: 'app-data-crop',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './data-crop.component.html',
  styleUrls: ['./data-crop.component.css']  // Cambiar a styleUrls
})
export class DataCropComponent implements OnInit {
  cropName!: string;
  displayedColumns: string[] = ['fecha', 'humedad', 'uvSolar', 'temperatura'];
  dataSource: DataEntry[] = [];

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cropName = params['cropName'];
    })
    this.generateData();
  }

  generateData(): void {
    const startDate = new Date(2024, 8, 1); // Septiembre de 2024
    let quantity = Math.floor(Math.random() * (9 - 4 + 1)) + 4;
    for (let i = 0; i < quantity; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const entry: DataEntry = {
        fecha: currentDate.toLocaleDateString('es-ES'), // Formato de fecha
        humedad: this.getRandomHumidity(),
        uvSolar: this.getRandomUV(),
        temperatura: this.getRandomTemperature()
      };
      console.log(entry);
      this.dataSource.push(entry);

    }
    console.log(this.dataSource)
  }

  getRandomHumidity(): number {
    return Math.floor(Math.random() * (40 - 20 + 1)) + 20; // Random entre 20 y 40
  }

  getRandomUV(): number {
    return Math.floor(Math.random() * (5 - 1 + 1)) + 1; // Random entre 1 y 5
  }

  getRandomTemperature(): number {
    return Math.floor(Math.random() * (25 - 15 + 1)) + 15; // Random entre 15 y 25
  }
}
