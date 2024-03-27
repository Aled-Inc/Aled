import { Component, OnInit } from '@angular/core';
import { OpenFoodFactServiceService } from '../services/open-food-fact-service.service';

@Component({
  selector: 'lib-open-food-fact-service',
  template: ` <p>open-food-fact-service works!</p> `,
  styles: [],
})
export class OpenFoodFactServiceComponent implements OnInit {
  constructor(private service: OpenFoodFactServiceService) {}

  ngOnInit(): void {
    this.service.sample().subscribe(console.log);
  }
}
