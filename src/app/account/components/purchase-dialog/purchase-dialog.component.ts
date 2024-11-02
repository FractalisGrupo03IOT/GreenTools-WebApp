import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogActions } from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import {NgIf, TitleCasePipe} from "@angular/common";
import {PurchaseDialogData} from "../../models/purchase-dialog-data.interface";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel,
    ReactiveFormsModule,
    NgIf,
    MatError,
    TitleCasePipe
  ],
  styleUrls: ['./purchase-dialog.component.css']
})
export class PurchaseDialogComponent {
  purchaseForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<PurchaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PurchaseDialogData,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.purchaseForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/), this.luhnValidator]],
      month: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      year: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
    });
  }

  // Validador de Luhn para el número de tarjeta
  luhnValidator(control: AbstractControl) {
    const value = control.value;
    let sum = 0;
    let shouldDouble = false;
    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0 ? null : { luhn: true };
  }

  onSubmit(): void {
    if (this.purchaseForm.valid) {
      this.isSubmitting = true;
      const cardNumber = this.purchaseForm.get('cardNumber')?.value.toString();
      const month = this.purchaseForm.get('month')?.value.padStart(2, '0');
      const year = this.purchaseForm.get('year')?.value;
      const expirationDate = `${year}-${month}-01`;

      // Construir el objeto de compra sin el campo 'id'
      const purchaseData = {
        user_id: 0,  // Establecer en 0 para que el backend lo sobrescriba basado en 'userId' en la URL
        plan: this.data.plan,
        cardNumber: cardNumber,
        datePayment: {
          purchaseDate: new Date().toISOString().split('T')[0],  // Formato YYYY-MM-DD
          expirationDate: expirationDate  // Formato YYYY-MM-DD
        }
      };

      console.log("Datos de compra enviados:", purchaseData);

      // Configurar los parámetros de consulta para incluir 'userId'
      const params = new HttpParams().set('userId', this.data.userId.toString());

      // Si el backend requiere autenticación, agrega los headers aquí
      // const token = localStorage.getItem('authToken'); // Reemplaza con tu método de obtener el token
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${token}`
      // });

      this.http.post('https://fractalisbackend-production.up.railway.app/api/v1/payment', purchaseData, { params /*, headers */ })
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.snackBar.open("¡Compra exitosa! Tu suscripción ha sido activada.", "Cerrar", {
              duration: 5000,
              panelClass: ['snackbar-success']
            });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error("Error en la compra:", error);
            if (error.error) {
              if (typeof error.error === 'string') {
                this.snackBar.open(`Error en la compra: ${error.error}`, "Cerrar", {
                  duration: 5000,
                  panelClass: ['snackbar-error']
                });
              } else if (error.error.message) {
                this.snackBar.open(`Error en la compra: ${error.error.message}`, "Cerrar", {
                  duration: 5000,
                  panelClass: ['snackbar-error']
                });
              } else {
                this.snackBar.open("Hubo un problema en la compra. Verifica los datos e inténtalo de nuevo.", "Cerrar", {
                  duration: 5000,
                  panelClass: ['snackbar-error']
                });
              }
            } else {
              this.snackBar.open("Hubo un problema en la compra. Verifica los datos e inténtalo de nuevo.", "Cerrar", {
                duration: 5000,
                panelClass: ['snackbar-error']
              });
            }
            this.isSubmitting = false;
          }
        });
    } else {
      this.handleFormErrors();
    }
  }

  handleFormErrors(): void {
    const errors = [];
    if (this.purchaseForm.get('cardNumber')?.invalid) {
      if (this.purchaseForm.get('cardNumber')?.errors?.['required']) {
        errors.push("Número de tarjeta es obligatorio.");
      }
      if (this.purchaseForm.get('cardNumber')?.errors?.['pattern']) {
        errors.push("Número de tarjeta debe contener 16 dígitos numéricos.");
      }
      if (this.purchaseForm.get('cardNumber')?.errors?.['luhn']) {
        errors.push("Número de tarjeta inválido.");
      }
    }
    if (this.purchaseForm.get('month')?.invalid) {
      errors.push("Mes inválido. Debe estar en el formato MM.");
    }
    if (this.purchaseForm.get('year')?.invalid) {
      errors.push("Año inválido. Debe estar en el formato YYYY.");
    }

    if (errors.length > 0) {
      this.snackBar.open(errors.join("\n"), "Cerrar", {
        duration: 5000,
        panelClass: ['snackbar-error']
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
