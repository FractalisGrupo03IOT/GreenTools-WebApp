import {Component, Inject, OnInit} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { MatTableModule} from "@angular/material/table";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ToolbarComponent} from "../../../public/components/toolbar/toolbar.component";

import {
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";



@Component({
  selector: 'app-data-crop',
  standalone: true,
  imports: [ CommonModule, MatTableModule, RouterLink, MatButton, MatIconButton, MatIcon, ToolbarComponent, MatDialogTitle, MatDialogContent, MatProgressSpinner, MatDialogActions, MatDialogClose],
  templateUrl: './data-crop.component.html',
  styleUrls: ['./data-crop.component.css']
})
export class DataCropComponent implements OnInit {
  stationId: number | null = null;
  plantId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.stationId = Number(params.get('stationId'));
      this.plantId = Number(params.get('plantId'));
      console.log('Cargando datos para la estación con ID:', this.stationId, 'y planta con ID:', this.plantId);
    });
  }
}
