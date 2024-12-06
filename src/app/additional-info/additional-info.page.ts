import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.page.html',
  styleUrls: ['./additional-info.page.scss'],
})
export class AdditionalInfoPage implements OnInit {
  fullName: string = '';
  age: number | null = null;
  gender: string = '';
  height: number | null = null;
  weight: number | null = null;
  medicationStartDate: string = '';

  constructor(private _router: Router) {}

  ngOnInit() {}

  submit() {
    console.log('Full Name:', this.fullName);
    console.log('Age:', this.age);
    console.log('Gender:', this.gender);
    console.log('Height (cm):', this.height);
    console.log('Weight (kg):', this.weight);
    console.log('Medication Start Date:', this.medicationStartDate);
  }
}
