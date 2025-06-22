import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPrescriptionComponent } from './components/add-prescription/add-prescription.component';
import { PrescriptionService } from '../services/profile/prescription/prescription.service';
import { Prescription } from '../services/profile/prescription/prescription.interface';
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.page.html',
  styleUrls: ['./prescription.page.scss'],
})

export class PrescriptionPage implements OnInit {
  userPrescriptions: Prescription[] = [];

  constructor(
    private modalController: ModalController,
    private prescriptionService: PrescriptionService
  ) { }

  ngOnInit(): void {
    this.prescriptionService.getUserPrescrptions().then((data) => this.userPrescriptions = data)
  }

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
