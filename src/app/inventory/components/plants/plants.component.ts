import {Component, OnInit} from '@angular/core';
import {Plant} from "../../models/plant.model";
import {CropsService} from "../../services/crops.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent implements OnInit{
  plants: Plant[] = [];
  stationId!: number;
  stationName!: string;

  constructor(private cropService: CropsService, private route:ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.stationId = +params['stationId'];
      this.stationName = params['cropName'];
      this.loadPlants(this.stationId);
    });
    console.log(this.stationName)
  }

  loadPlants(stationId: number): void {
    this.cropService.getPlants(stationId).subscribe((data: Plant[]) => {
      this.plants = data;
    });
  }

  goToReport(cropName: string){
    this.router.navigate(["/crops/data", cropName]);
  }

}
