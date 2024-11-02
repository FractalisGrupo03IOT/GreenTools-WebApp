import {Component, Inject, OnInit} from '@angular/core';
import {Plant} from "../../models/plant.model";
import {CropsService} from "../../services/crops.service";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormField, ReactiveFormsModule, MatInput, MatButton, MatLabel, MatDialogTitle, MatDialogActions, MatIcon, MatDialogContent, MatError],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent implements OnInit {
  addPlantForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<PlantsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stationId: number }, // Recibe el `stationId`
    private fb: FormBuilder,
    private cropsService: CropsService
  ) {
    this.addPlantForm = this.fb.group({
      name: ['', Validators.required],
      plantImage: ['', [Validators.required, Validators.pattern('(https?://.*\\.(?:png|jpg|jpeg|gif|svg))')]]
    });
  }

  ngOnInit(): void {
    console.log('Datos recibidos en PlantsComponent:', this.data);
  }

  onSubmit(): void {
    if (this.addPlantForm.valid) {
      this.isSubmitting = true;
      const newPlant: Plant = {
        ...this.addPlantForm.value,
        stationId: this.data.stationId // Usa el `stationId` del dato inyectado
      };

      console.log('Nueva planta a agregar:', newPlant); // Depuración

      this.cropsService.addPlant(newPlant).subscribe(
        () => {
          this.isSubmitting = false;
          this.dialogRef.close(true); // Cierra el modal al terminar
        },
        (error) => {
          console.error('Error al agregar la planta:', error);
          this.errorMessage = 'Error al agregar la planta.';
          this.isSubmitting = false;
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Cierra el modal sin realizar acciones
  }
}
