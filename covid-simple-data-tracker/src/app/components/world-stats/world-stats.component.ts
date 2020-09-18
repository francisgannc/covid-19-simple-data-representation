import { DataService, WorldStats } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-world-stats',
  templateUrl: './world-stats.component.html',
  styleUrls: ['./world-stats.component.scss'],
})
export class WorldStatsComponent implements OnInit {
  worldStats: WorldStats;
  loading = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getWorldTotal().subscribe((value) => {
      this.worldStats = value;
      this.loading = false;
    });
  }

}
