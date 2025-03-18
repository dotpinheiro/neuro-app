import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-of-use-modal',
  templateUrl: './terms-of-use-modal.component.html',
  styleUrls: ['./terms-of-use-modal.component.scss'],
})
export class TermsOfUseModalComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }

}
