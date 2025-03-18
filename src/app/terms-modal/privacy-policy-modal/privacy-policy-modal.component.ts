import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy-modal',
  templateUrl: './privacy-policy-modal.component.html',
  styleUrls: ['./privacy-policy-modal.component.scss'],
})
export class PrivacyPolicyModalComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }

}
