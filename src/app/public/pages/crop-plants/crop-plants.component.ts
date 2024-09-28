import { Component } from '@angular/core';
import {PlantsComponent} from "../../../inventory/components/plants/plants.component";
import {StationComponent} from "../../../inventory/components/station/station.component";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";

@Component({
  selector: 'app-crop-plants',
  standalone: true,
  imports: [
    PlantsComponent,
    StationComponent,
    ToolbarComponent
  ],
  templateUrl: './crop-plants.component.html',
  styleUrl: './crop-plants.component.css'
})
export class CropPlantsComponent {

}
