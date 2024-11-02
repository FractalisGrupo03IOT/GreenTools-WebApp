import {Component, Input} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NotificationComponent } from "../notification/notification.component";
import {MatTooltip} from "@angular/material/tooltip";
import {Station} from "../../../inventory/models/stations.model";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, NotificationComponent, MatTooltip],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'] // corregí 'styleUrl' a 'styleUrls'
})
export class ToolbarComponent {
  @Input() station: Station | null = null;
  constructor(private router: Router) {}

  toggleNotifications() {
    const container = document.querySelector('.notification-container');
    if (container) {
      container.classList.toggle('show');
    }
  }

  logout(): void {
    localStorage.removeItem('user_id');
    localStorage.removeItem('hasMembership'); // Limpiar bandera de membresía al hacer logout
    this.router.navigate(['/login']);
  }
}
