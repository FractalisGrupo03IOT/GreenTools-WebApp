import {Component, Inject, OnInit} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { MatTableModule} from "@angular/material/table";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ToolbarComponent} from "../../../public/components/toolbar/toolbar.component";

import {
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {PlantDataService} from "../../services/plant-data.service";
import {CropChartData} from "../../models/cropChartData";
import {Chart, ChartOptions, registerables} from "chart.js";
import 'chartjs-adapter-date-fns';
import {MatCardImage} from "@angular/material/card";
import {Plan} from "../../../account/models/plan.enum";
import {Plant} from "../../../inventory/models/plant.model";

Chart.register(...registerables)

@Component({
  selector: 'app-data-crop',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, MatButton, MatIconButton, MatIcon, ToolbarComponent, MatDialogTitle, MatDialogContent, MatProgressSpinner, MatDialogActions, MatDialogClose, MatCardImage],
  templateUrl: './data-crop.component.html',
  styleUrls: ['./data-crop.component.css']
})
export class DataCropComponent implements OnInit {
  stationId: number | null = null;
  plantId: number | null = null;
  chartData: CropChartData[] = [];
  labelData: string[] = [];
  humidityData: any[] = [];
  temperatureData: any[] = [];
  uvData: any[] = [];
  plant: Plant | null = null;

  constructor(private route: ActivatedRoute, private service: PlantDataService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.stationId = Number(params.get('stationId'));
      this.plantId = Number(params.get('plantId'));
      console.log('Cargando datos para la estación con ID:', this.stationId, 'y planta con ID:', this.plantId);
    });
    this.service.getPlantById(this.plantId!).subscribe(plant => {this.plant = plant})
    this.loadChartData();
  }

  loadChartData(){
    this.service.getCropDataByPlantId(this.plantId!).subscribe(item=>{
      this.chartData = item;
      if(this.chartData != null){
        this.chartData.map(data=>{
          const date = new Date(data.dataDate);
          const utcDate = new Date(date + "Z");
          const options: Intl.DateTimeFormatOptions = {
            timeZone: 'America/Lima', // Zona horaria de Perú (UTC-5)
            hour12: false,            // Usa formato de 24 horas
            hour: '2-digit',          // Formatea la hora en 2 dígitos
            minute: '2-digit'         // Formatea los minutos en 2 dígitos
          };

          // Formatear la fecha y obtener solo la hora en formato "HH:mm"
          const timeInPeru = new Intl.DateTimeFormat('en-US', options).format(utcDate);
          this.labelData.push(timeInPeru);
          this.humidityData.push(data.humidity);
          this.temperatureData.push(data.temperature);
          this.uvData.push(data.uv);
        });
        console.log(this.temperatureData);
        this.renderChart(this.labelData, this.temperatureData, 'temperatureChart', 'rgba(75, 192, 192, 0.2)', 'Temp in °C');
        this.renderChart(this.labelData, this.humidityData, 'humidityChart', 'rgb(255, 182, 193, 0.3)', 'Hum in %');
        this.renderChart(this.labelData, this.uvData, 'uvChart', 'rgb(173, 216, 230, 0.5)', 'UV Index');
      }
    });
  }

  renderChart(labelData: any, valueData: any, chartId: string, color: string, chartLabel: string){
    const options: ChartOptions = {
      scales: {
        x: {
          type: 'time',  // Configurar el eje X como una escala de tiempo
          time: {
            unit: 'minute',  // Unidad de tiempo (puede ser 'minute', 'hour', etc.)
            displayFormats: {
              minute: 'yyyy-MM-dd HH:mm:ss'  // Formato de visualización de la fecha
            }
          },
          title: {
            display: true,
            text: 'Fecha y Hora'
          },
        }
      },
    };
    const myChart = new Chart(chartId,{
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [
          {
            label: chartLabel,
            data: valueData,
            backgroundColor: color,
          }
        ]
      },
      options: {} // options config
    })
  }
}
