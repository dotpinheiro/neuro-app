import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPrescriptionComponent } from './components/add-prescription/add-prescription.component';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.page.html',
  styleUrls: ['./prescription.page.scss'],
})
export class PrescriptionPage {

  constructor(
    private modalController: ModalController
  ) { }

  async addPrescription() {
    const modal = await this.modalController.create({
      component: AddPrescriptionComponent
    })
    await modal.present()
  }
}
