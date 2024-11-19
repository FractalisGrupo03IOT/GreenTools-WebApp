import { Component } from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {PlantDataService} from "../../services/plant-data.service";
import {ActivatedRoute} from "@angular/router";
import {ToolbarComponent} from "../../../public/components/toolbar/toolbar.component";

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    ToolbarComponent
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  displayedColumns: string[] = ['numero','fecha','humedad', 'temperatura', 'uv'];
  dataSource: any;
  clickedRow: number | null = null;
  plantId: number | null = null;

  constructor(private route: ActivatedRoute, private cropDataService: PlantDataService) {}

  rowClicked(index: number) {
    this.clickedRow = index === this.clickedRow ? null : index;
  }

  isRowClicked(index: number): boolean {
    return index === this.clickedRow;
  }

  ngOnInit() :void {
    this.route.paramMap.subscribe((params) => {
      this.plantId = Number(params.get('plantId'));
      console.log('Cargando datos para la planta con ID:', this.plantId);
    });
    this.cropDataService.getAllCropDataByPlantId(this.plantId!).subscribe(
      (data: any) => {
        this.dataSource = data.map((item: any) => {
          // Convertir 'dataDate' (en formato UTC) a un objeto Date
          const date = new Date(item.dataDate + "Z");  // Agregar 'Z' para indicar UTC

          // Obtener partes de la fecha por separado
          const day = date.getDate().toString().padStart(2, '0');  // Día con 2 dígitos
          const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Mes con 2 dígitos
          const year = date.getFullYear();  // Año
          const hour = date.getHours().toString().padStart(2, '0');  // Hora con 2 dígitos
          const minute = date.getMinutes().toString().padStart(2, '0');  // Minutos con 2 dígitos

          // Formatear la fecha como DD/MM/YYYY HH:mm
          item.dataDate = `${day}/${month}/${year}  -  ${hour}:${minute}`;

          return item;
        });

        this.dataSource = this.dataSource.reverse();
        console.log(this.dataSource)
      }
    );
  }
}
