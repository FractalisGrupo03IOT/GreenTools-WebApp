import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PlantsComponent } from "../../../inventory/components/plants/plants.component";
import { StationComponent } from "../../../inventory/components/station/station.component";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { CropsService } from "../../../inventory/services/crops.service";
import {CropData, CropDataService} from "../../../inventory/services/crop-data.service";
import { Plant } from "../../../inventory/models/plant.model";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {catchError, forkJoin, of} from "rxjs";
import {DataCropComponent} from "../../../cropStatus/components/data-crop/data-crop.component";

@Component({
  selector: 'app-crop-plants',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    DataCropComponent,
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
    NgIf,
    MatCardActions,
    NgClass,
    RouterLink
  ],
  templateUrl: './crop-plants.component.html',
  styleUrls: ['./crop-plants.component.css']
})
export class CropPlantsComponent implements OnInit {
  stationId: number | null = null;
  plants: PlantWithStatus[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private dialog: MatDialog,
    private cropsService: CropsService,
    private cropDataService: CropDataService,
    private route: ActivatedRoute
  ) {
  }

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
          // Convertir cada planta a PlantWithStatus
          this.plants = plants.map(plant => ({
            ...plant,
            hasCropData: false, // Valor por defecto
            isChecking: true // Indicador de carga por planta
          }));

          // Crear un array de observables para verificar cropData de cada planta
          const observables = this.plants.map(plant =>
            this.cropDataService.getCropDataByPlantId(plant.id).pipe(
              catchError(error => {
                // Manejar errores individualmente
                console.error(`Error al obtener cropData para la planta ${plant.id}:`, error);
                return of(null);
              })
            )
          );

          // Ejecutar todas las solicitudes GET en paralelo
          forkJoin(observables).subscribe(
            (results: (CropData | null)[]) => {
              results.forEach((result, index) => {
                if (result) {
                  this.plants[index].hasCropData = true;
                } else {
                  this.plants[index].hasCropData = false;
                }
                this.plants[index].isChecking = false; // Finalizar indicador de carga por planta
                console.log(`Planta ID: ${this.plants[index].id}, hasCropData: ${this.plants[index].hasCropData}`);
              });
              this.isLoading = false;
            },
            (error) => {
              console.error('Error al verificar cropData:', error);
              this.errorMessage = 'Error al verificar el estado de los sensores.';
              this.isLoading = false;
            }
          );
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
        data: {stationId: this.stationId},
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadPlants();
        }
      });
    } else {
      console.error('stationId no está definido, no se puede abrir el formulario de agregar planta.');
      this.errorMessage = 'No se pudo abrir el formulario de agregar planta.';
    }
  }

  // Método para activar el sensor
  activateSensor(plant: PlantWithStatus): void {
    this.cropDataService.activateSensor(plant.id).subscribe(
      (response) => {
        console.log('Sensor activado para la planta:', plant.id);
        this.successMessage = `Sensor activado para la planta "${plant.name}".`;
        this.errorMessage = ''; // Limpiar cualquier mensaje de error previo
        plant.hasCropData = true; // Actualizar el estado de la planta
      },
      (error) => {
        console.error('Error al activar el sensor:', error);
        this.errorMessage = `Error al activar el sensor para la planta "${plant.name}".`;
        this.successMessage = ''; // Limpiar cualquier mensaje de éxito previo
      }
    );
  }

  // Método para abrir el modal "Ver Datos"
  verDatos(plant: PlantWithStatus): void {
    console.log("Abriendo modal para planta:", plant); // Para verificar que se ejecute
    const dialogRef = this.dialog.open(DataCropComponent, {
      width: '600px',
      data: { plant } // Opcional, pasa datos si es necesario
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Modal de datos de cultivo cerrado');
    });
  }
}

// Extender la interfaz Plant para incluir el estado de cropData
interface PlantWithStatus extends Plant {
  hasCropData: boolean;
  isChecking: boolean; // Para indicar que se está verificando el estado
}
