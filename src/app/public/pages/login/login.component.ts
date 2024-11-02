import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatInput, MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatLabel,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.http.get<any[]>('https://fractalisbackend-production.up.railway.app/api/v1/users').subscribe(
        users => {
          const user = users.find(u => u.email.address === email);

          if (user && user.address.number === password) {
            console.log("Login exitoso");
            localStorage.setItem('user_id', user.id.toString());  // Guardar el user_id

            if (user.hasMembership || localStorage.getItem('hasMembership') === 'true') {
              this.router.navigate(['/crops/station']);
            } else {
              localStorage.setItem('hasMembership', 'true');
              this.router.navigate(['/membership/upgrade']);
            }
          } else {
            console.error("Correo o contraseña incorrectos");
            alert("Correo o contraseña incorrectos");
          }
        },
        error => {
          console.error("Error al obtener la lista de usuarios", error);
          alert("Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
        }
      );
    }
  }
}
