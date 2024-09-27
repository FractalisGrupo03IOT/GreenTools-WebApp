import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import { Router } from '@angular/router';
import {MatIcon} from "@angular/material/icon";
interface Notification {
  id: string;
  title: string;
  plant: string;
  day: string;
}
@Component({
  selector: 'app-notification-card',
  standalone: true,
    imports: [MatCardModule, CommonModule, MatIcon],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css'
})
export class NotificationCardComponent{

    @Input() notification!: Notification;

    constructor(private router: Router) {}

}
