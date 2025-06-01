import { Component, Input } from '@angular/core';
import { Prescription } from 'src/app/services/profile/prescription/prescription.interface';

@Component({
  selector: 'app-prescription-occurence',
  templateUrl: './prescription-occurence.component.html',
  styleUrls: ['./prescription-occurence.component.scss'],
})
export class PrescriptionOccurenceComponent {
  @Input() userPrescriptions: Prescription[] = [];

  constructor() { }

  formatDate(date: string): string {
    return (date.replace(/-/g, '/'));
  }
}
