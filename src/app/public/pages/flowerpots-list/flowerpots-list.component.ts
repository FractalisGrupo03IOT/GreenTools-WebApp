import { Component } from '@angular/core';

import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { WelcomeUserComponent } from '../../../profile/components/welcome-user/welcome-user.component';
import { MyFlowerpotsComponent } from '../../../loan/components/my-flowerpots/my-flowerpots.component';

@Component({
  selector: 'app-flowerpots-list',
  standalone: true,
  imports: [ToolbarComponent, WelcomeUserComponent , MyFlowerpotsComponent],
  templateUrl: './flowerpots-list.component.html',
  styleUrl: './flowerpots-list.component.css'
})
export class FlowerpotsListComponent {

}

