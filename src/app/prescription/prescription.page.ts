import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPrescriptionComponent } from './components/add-prescription/add-prescription.component';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
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
    private localStorageService: LocalStorageService
  ) { }

  async addPrescription() {
    const modal = await this.modalController.create({
      component: AddPrescriptionComponent
    })
    await modal.present()
  }

  getPrescription() {
    const userId = this.localStorageService.getItem<UserObj>("user");
    if(userId){
      userId.id;
    }
  }
}
