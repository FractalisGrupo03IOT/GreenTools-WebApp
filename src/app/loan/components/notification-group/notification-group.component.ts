import {Component, Input, OnInit} from '@angular/core';
import {NotificationCardComponent} from "../notification-card/notification-card.component";
import {NgForOf, NgIf} from "@angular/common";

interface Notification {
    id: string;
    title: string;
    plant: string;
    day: string;
}
@Component({
  selector: 'app-notification-group',
  standalone: true,
    imports: [NotificationCardComponent, NgForOf, NgIf],
  templateUrl: './notification-group.component.html',
  styleUrl: './notification-group.component.css'
})
export class NotificationGroupComponent implements OnInit{
    @Input() notifications: Notification[] = [
        { id: '1', title: 'TOMATE 01 ', plant: 'Temperatura baja', day: '2024-05-28' },
        { id: '2', title: 'TOMATE 02' , plant: 'Humedad alta', day: '2024-05-20' },
        { id: '3', title: 'MAIZ 01', plant: 'Indice UV alto', day: '2024-05-20' },
        { id: '4', title: 'ARANDANO 1', plant: 'Necesita riego', day: '2024-05-21' },
        { id: '5', title: 'ARANDANO 2', plant: 'Actuador activado', day: '2024-05-21' },
    ];
    groupedNotifications: { date: string; notifications: Notification[] }[] = [];
    hasNotifications = true;

    ngOnInit() {
        this.groupNotificationsByDate();
    }

    groupNotificationsByDate() {
        const grouped: { [key: string]: Notification[] } = {};
        const today = new Date().toISOString().split('T')[0];

        this.notifications.forEach(notification => {
            const notificationDate = notification.day === today ? 'Today' : notification.day;

            if (!grouped[notificationDate]) {
                grouped[notificationDate] = [];
            }
            grouped[notificationDate].push(notification);
        });

        this.groupedNotifications = Object.keys(grouped).map(date => ({
            date,
            notifications: grouped[date]
        }));

        this.hasNotifications = this.groupedNotifications.length > 0;
    }
}
