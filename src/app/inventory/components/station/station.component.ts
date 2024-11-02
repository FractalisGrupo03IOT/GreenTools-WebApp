import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {Station} from "../../models/stations.model";
import {StationsService} from "../../services/stations.service";
import {Router} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormField, MatButton, MatInput, FormsModule, MatLabel, MatIcon],
  templateUrl: './station.component.html',
  styleUrl: './station.component.css'
})
export class StationComponent implements OnInit {
  stations: Station[] = [];
  newStation = {
    userId: 0,  // Se actualiza con el ID del usuario logueado
    stationName: '',
    description: '',
    endDate: '',
    stationImage: ''
  };

  constructor(
    private stationService: StationsService,
    private router: Router,
    private dialogRef: MatDialogRef<StationComponent>,  // Inyectar MatDialogRef
    private snackBar: MatSnackBar  // Inyectar MatSnackBar para notificaciones
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.newStation.userId = parseInt(userId, 10);
    } else {
      console.error("Usuario no autenticado.");
      this.router.navigate(['/login']);  // Redirigir al login si no hay user_id
    }
  }

  addStation(): void {
    // Validación de campos necesarios antes de realizar el post
    if (this.newStation.stationName && this.newStation.description && this.newStation.endDate && this.newStation.stationImage) {
      this.stationService.createStation(this.newStation).subscribe(
        (station: Station) => {
          this.stations.push(station);
          this.resetForm();
          this.dialogRef.close();  // Cerrar el modal
          this.snackBar.open('Estación creada exitosamente', 'Cerrar', {  // Mostrar notificación de éxito
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/crops/station']);  // Redirigir después de un post exitoso
        },
        error => {
          console.error("Error al crear la estación", error);
          alert("Error al crear la estación. Inténtalo nuevamente.");
        }
      );
    } else {
      alert("Por favor, completa todos los campos.");
    }
  }

  cancel(): void {
    this.resetForm();
    this.dialogRef.close();  // Cerrar el modal
    this.router.navigate(['/crops/station']);  // Redirigir al cancelar
  }

  goToPlants(stationId: number): void {
    this.router.navigate(['/crops/plants', stationId]);
  }

  private resetForm(): void {
    this.newStation = {
      userId: this.newStation.userId,  // Mantener el user_id actual
      stationName: '',
      description: '',
      endDate: '',
      stationImage: ''
    };
  }
}
