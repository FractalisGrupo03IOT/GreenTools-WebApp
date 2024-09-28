import { Component } from '@angular/core';
import {StationComponent} from "../../../inventory/components/station/station.component";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";

@Component({
  selector: 'app-crop-inventory',
  standalone: true,
  imports: [
    StationComponent,
    ToolbarComponent
  ],
  templateUrl: './crop-inventory.component.html',
  styleUrl: './crop-inventory.component.css'
})
export class CropInventoryComponent {

}
