import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NotificationComponent } from "../notification/notification.component";


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, NotificationComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(private router:Router) {}

  toggleNotifications() {
    const container = document.querySelector('.notification-container');
    if (container) {
      container.classList.toggle('show');
    }
  }
  
}
