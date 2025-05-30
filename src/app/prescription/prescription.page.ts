import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPrescriptionComponent } from './components/add-prescription/add-prescription.component';
import { UserService } from '../services/user/user.service';
import { PrescriptionService } from '../services/profile/prescription/prescription.service';
interface UserObj {
  id: string;
  aud: string;
  role: string;
}
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.page.html',
  styleUrls: ['./prescription.page.scss'],
})

export class PrescriptionPage {

  constructor(
    private modalController: ModalController,
    private prescriptionService: PrescriptionService
  ) { }

  async addPrescription() {
    const modal = await this.modalController.create({
      component: AddPrescriptionComponent
    })
    await modal.present()
  }

  async getPrescription() {
    this.prescriptionService.getUserPrescrptions().then((data) => {
      console.log(data)
    })
  }
}
