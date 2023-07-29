import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainee-performance',
  templateUrl: './trainee-performance.component.html',
  styleUrls: ['./trainee-performance.component.css']
})
export class TraineePerformanceComponent implements OnInit {

  constructor() { }

  nav_position: string = 'end';

  onTogglePosition(position:string) {
    this.nav_position = position === 'end' ? 'start' : 'end'; 
  }

  ngOnInit(): void {
  }

}
