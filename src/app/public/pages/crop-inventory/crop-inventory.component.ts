import { Component, OnInit } from '@angular/core';
import { Station } from '../../../inventory/models/stations.model';
import { StationsService } from '../../../inventory/services/stations.service';
import { MatDialog } from "@angular/material/dialog";
import { StationComponent } from "../../../inventory/components/station/station.component";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle
}

from "@angular/material/card";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {Router, RouterModule} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {PlantsComponent} from "../../../inventory/components/plants/plants.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-crop-inventory',
  standalone: true,
  imports: [
    RouterModule,
    PlantsComponent,
    LoginComponent,
    StationComponent,
    ToolbarComponent,
    MatIconModule,
    MatButtonModule,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCard,
    MatCardImage,
    DatePipe,
    MatCardSubtitle,
    MatCardTitle,
    NgOptimizedImage,
    NgIf,
    NgForOf,
    NgStyle,
    MatProgressSpinner
  ],
  templateUrl: './crop-inventory.component.html',
  styleUrls: ['./crop-inventory.component.css']
})
export class CropInventoryComponent implements OnInit {
  stations: Station[] = []; // Lista de estaciones
  isLoading: boolean = true; // Indicador de carga

  constructor(
    private dialog: MatDialog,
    private stationService: StationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserStations();
  }

  loadUserStations(): void {
    const userId = localStorage.getItem('user_id');
    console.log('user_id from localStorage:', userId);
    if (userId) {
      this.stationService.getStationByUserId(parseInt(userId, 10)).subscribe(
        (stationsResponse) => {
          console.log('Estaciones recibidas:', stationsResponse); // Log de las estaciones recibidas
          // Filtrar estaciones con id > 0
          this.stations = stationsResponse.filter(s => s.id > 0);
          console.log('Estaciones filtradas:', this.stations); // Log de las estaciones filtradas
          this.isLoading = false; // Finalizar la carga
        },
        (error) => {
          console.error('Error al obtener las estaciones del usuario:', error);
          this.isLoading = false; // Finalizar la carga incluso si hay error
        }
      );
    } else {
      console.error("Usuario no autenticado.");
      this.isLoading = false;
    }
  }

  openStationModal(): void {
    const dialogRef = this.dialog.open(StationComponent, {
      width: '71vw',
      maxWidth: '71vw',
      height: '71vh',
      panelClass: 'custom-modal'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadUserStations(); // Recargar estaciones después de cerrar el modal
    });
  }

  goToPlants(stationId: number | undefined): void {
    if (stationId !== undefined && stationId > 0) { // Verificación más estricta
      this.router.navigate([`/crops/plants`, stationId]);
    } else {
      console.error('stationId is undefined o inválido');
      alert('No se encontró una estación válida. Intenta recargar la página.');
    }
  }

  trackByStationId(index: number, station: Station): number {
    return station.id;
  }
}
