import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './recover-password-confirmation.component.html',
  styleUrls: ['./recover-password-confirmation.component.css']
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      profileImage: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  createUser() {
    if (this.userForm.invalid) {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    const userData = {
      id: 0, // Si el campo id es obligatorio, sino puede omitirse
      name: {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName
      },
      email: {
        address: this.userForm.value.email
      },
      profileImage: this.userForm.value.profileImage,
      address: {
        street: this.userForm.value.street,
        number: this.userForm.value.number,
        city: this.userForm.value.city,
        zipCode: this.userForm.value.zipCode,
        country: this.userForm.value.country
      }
    };

    this.http.post('https://fractalisbackend-production.up.railway.app/api/v1/user', userData).subscribe(
      () => {
        this.snackBar.open('Usuario creado exitosamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error => {
        this.snackBar.open('Error al crear el usuario. Intente de nuevo.', 'Cerrar', { duration: 3000 });
        console.error('Error al crear usuario:', error);
      }
    );
  }
}
