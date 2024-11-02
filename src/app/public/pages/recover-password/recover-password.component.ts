import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recover-password',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardActions,
        MatCardAvatar,
        MatCardContent,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle
    ],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  constructor(private router: Router) {}

  onGoBack(): void {
    this.router.navigate(['/login']);
  }
}
