import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Prescription } from 'src/app/services/profile/prescription/prescription.interface';
import { ViewPrescriptionComponent } from '../view-prescription/view-prescription.component';

@Component({
  selector: 'app-prescription-occurence',
  templateUrl: './prescription-occurence.component.html',
  styleUrls: ['./prescription-occurence.component.scss'],
})
export class PrescriptionOccurenceComponent {
  @Input() userPrescriptions: Prescription[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  formatDate(date: string): string {
    return (date.replace(/-/g, '/'));
  }

  validPrescription(expirationDateStr: string): boolean {
    if(!expirationDateStr) return false;

    const expirationDate = new Date(expirationDateStr)
    return expirationDate > new Date();
  }

  async showPrescription(prescription: Prescription) {
    const modalPrescription = await this.modalController.create({
      component: ViewPrescriptionComponent,
      componentProps: {
        prescriptionItem: prescription
      }
    })
    await modalPrescription.present()
  }
}
