import { Component } from '@angular/core';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";

@Component({
  selector: 'app-recover-password-confirmation',
  standalone: true,
  imports: [
    ToolbarComponent
  ],
  templateUrl: './recover-password-confirmation.component.html',
  styleUrl: './recover-password-confirmation.component.css'
})
export class RecoverPasswordConfirmationComponent {

}
