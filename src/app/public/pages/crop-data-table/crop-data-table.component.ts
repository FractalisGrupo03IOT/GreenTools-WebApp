import { Component } from '@angular/core';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {DataCropComponent} from "../../../cropStatus/components/data-crop/data-crop.component";

@Component({
  selector: 'app-crop-data-table',
  standalone: true,
  imports: [
    ToolbarComponent,
    DataCropComponent
  ],
  templateUrl: './crop-data-table.component.html',
  styleUrl: './crop-data-table.component.css'
})
export class CropDataTableComponent {

}
