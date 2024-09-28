import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {Station} from "../../models/stations.model";
import {StationsService} from "../../services/stations.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './station.component.html',
  styleUrl: './station.component.css'
})
export class StationComponent implements OnInit{
  stations : Station[] = [];

  constructor(private  stationService: StationsService, private router:Router) {
  }
  ngOnInit(): void {
    this.stationService.getStations().subscribe((data: Station[]) => {
      this.stations = data;
    })
  }

  goToPlants(stationId: number): void {
    this.router.navigate(['/crops/plants', stationId]);
  }

}
