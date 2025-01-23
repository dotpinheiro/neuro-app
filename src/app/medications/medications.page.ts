import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.page.html',
  styleUrls: ['./medications.page.scss'],
})
export class MedicationsPage implements OnInit {

  times = [
    { name: 'Morning', active: false },
    { name: 'Afternoon', active: false },
    { name: 'Evening', active: false },
    { name: 'Night', active: false }
  ];

  meds = [
    { name: 'Prolopa', quantity: 1 },
    { name: 'Sinemet', quantity: 1 },
    { name: 'Stalevo', quantity: 1 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
