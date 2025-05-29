import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPrescriptionComponent } from './components/add-prescription/add-prescription.component';
import { UserService } from '../services/user/user.service';
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
    private userService: UserService
  ) { }

  async addPrescription() {
    const modal = await this.modalController.create({
      component: AddPrescriptionComponent
    })
    await modal.present()
  }

  async getPrescription() {
    const currentUser = await this.userService.getCurrentUser();
    //this.userService.getUserProfileId(currentUser.id);
  }
}
