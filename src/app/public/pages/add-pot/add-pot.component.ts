import { Component } from '@angular/core';

import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { AddPotInputComponent } from '../../../loan/components/add-pot-input/add-pot-input.component';

@Component({
  selector: 'app-add-pot',
  standalone: true,
  imports: [ToolbarComponent, AddPotInputComponent],
  templateUrl: './add-pot.component.html',
  styleUrl: './add-pot.component.css'
})
export class AddPotComponent {

}
