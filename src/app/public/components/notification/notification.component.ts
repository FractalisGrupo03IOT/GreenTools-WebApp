import {Component, OnInit} from '@angular/core';
import {NotificationCardComponent} from '../../../loan/components/notification-card/notification-card.component';
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {NotificationGroupComponent} from '../../../loan/components/notification-group/notification-group.component';

interface Notification {
    id: string;
    title: string;
    plant: string;
    day: string;
}
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NotificationCardComponent, NotificationGroupComponent, CommonModule, MatInputModule, MatFormFieldModule, FormsModule, MatIconModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  providers: [ { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } } ]
})
export class NotificationComponent implements OnInit{

    ngOnInit() {
    }
}
