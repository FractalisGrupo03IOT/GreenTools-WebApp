import { Component } from '@angular/core';


@Component({
  selector: 'app-welcome-user',
  standalone: true,
  imports: [],
  templateUrl: './welcome-user.component.html',
  styleUrl: './welcome-user.component.css'
})
export class WelcomeUserComponent {
  name: string = '';
  photo: string = '';


  
}
