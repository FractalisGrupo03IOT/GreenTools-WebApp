import { MatDialog } from '@angular/material/dialog';
import {Component, OnInit, ViewChild} from '@angular/core';
import { PlantsComponent } from "../../../inventory/components/plants/plants.component";
import { StationComponent } from "../../../inventory/components/station/station.component";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {StationsService} from "../../../inventory/services/stations.service";
import {CropsService} from "../../../inventory/services/crops.service";
import {Plant} from "../../../inventory/models/plant.model";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ActivatedRoute, ParamMap} from "@angular/router";


@Component({
  selector: 'app-crop-plants',
  standalone: true,
  imports: [
    PlantsComponent,
    StationComponent,
    ToolbarComponent,
    MatButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardContent,
    NgForOf,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './crop-plants.component.html',
  styleUrls: ['./crop-plants.component.css']
})
export class CropPlantsComponent implements OnInit {
  stationId: number | null = null;
  plants: Plant[] = []; // Lista de plantas para mostrar en la vista
  isLoading: boolean = false; // Indicador de carga
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private dialog: MatDialog,
    private cropsService: CropsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('stationId');
      if (id) {
        this.stationId = +id;
        console.log('stationId obtenido de la ruta:', this.stationId);
        this.loadPlants();
      } else {
        console.error('stationId no está definido en la ruta.');
        this.errorMessage = 'stationId no está definido en la ruta.';
      }
    });
  }

  loadPlants(): void {
    if (this.stationId !== null && this.stationId !== undefined) {
      this.isLoading = true;
      this.cropsService.getPlants(this.stationId).subscribe(
        (plants) => {
          this.plants = plants;
          this.isLoading = false;
          console.log('Plantas cargadas:', this.plants);
        },
        (error) => {
          console.error('Error al cargar las plantas:', error);
          this.errorMessage = 'Error al cargar las plantas.';
          this.isLoading = false;
        }
      );
    }
  }

  openAddPlantForm(): void {
    console.log('Intentando abrir el formulario de agregar planta. stationId:', this.stationId);
    if (this.stationId !== null && this.stationId !== undefined) {
      const dialogRef = this.dialog.open(PlantsComponent, {
        width: '400px',
        data: { stationId: this.stationId },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadPlants(); // Recargar la lista de plantas al cerrar el modal exitosamente
        }
      });
    } else {
      console.error('stationId no está definido, no se puede abrir el formulario de agregar planta.');
      this.errorMessage = 'No se pudo abrir el formulario de agregar planta.';
    }
  }
}
