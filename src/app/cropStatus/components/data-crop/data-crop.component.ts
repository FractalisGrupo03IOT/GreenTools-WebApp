import { Component, OnInit } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { MatTableModule } from "@angular/material/table";


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


interface DataEntry {
  fecha: string;
  humedad: number;
  uvSolar: number;
  temperatura: number;
}

@Component({
  selector: 'app-data-crop',
  standalone: true,
  imports: [BrowserModule, MatTableModule],
  templateUrl: './data-crop.component.html',
  styleUrls: ['./data-crop.component.css']  // Cambiar a styleUrls
})
export class DataCropComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'humedad', 'uvSolar', 'temperatura'];
  dataSource: DataEntry[] = [];

  ngOnInit(): void {
    this.generateData();
  }

  generateData(): void {
    const startDate = new Date(2024, 8, 1); // Septiembre de 2024
    for (let i = 0; i < 27; i++) {
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
