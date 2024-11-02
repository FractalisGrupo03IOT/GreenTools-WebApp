import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from "../../../public/components/toolbar/toolbar.component";
import { HttpClient } from "@angular/common/http";
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-welcome-user',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {
  name: string = '';
  email: string = '';
  profileImage: string = '';
  fullAddress: string = '';
  city: string = '';
  country: string = '';
  zipCode: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.http.get<any>(`https://fractalisbackend-production.up.railway.app/api/v1/user/${userId}`).subscribe(
        user => {
          this.name = `${user.name.firstName} ${user.name.lastName}`;
          this.email = user.email.address;
          this.profileImage = user.profileImage;
          this.fullAddress = `${user.address.street} ${user.address.number}`;
          this.city = user.address.city;
          this.country = user.address.country;
          this.zipCode = user.address.zipCode;
        },
        error => {
          console.error("Error al obtener los datos del usuario", error);
        }
      );
    }
  }
}
