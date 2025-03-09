import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MedicationService} from "../../services/profile/medication/medication.service";

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  form: FormGroup;
  humor: number = 5;
  sintomas: string = '';
  numbers: number[] = Array.from({ length: 11 }, (_, i) => i);

  constructor(
    private modalController: ModalController,
    private medService: MedicationService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private toastController: ToastController,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      medication_name: [null, Validators.required],
      medication_manufacturer: [null, Validators.required],
      medication_description: [null],
    });
  }


  async enviarFeedback() {
    console.log('Humor:', this.humor);
    console.log('Sintomas:', this.sintomas);

    const toast = await this.toastController.create({
      message: 'Humor enviado com sucesso!',
      duration: 2000,
      color: 'success',
    });
    await toast.present();

    await this.modalController.dismiss()
  }

  getColor(value: number): string {
    if (value <= 3) return 'danger';
    if (value <= 6) return 'warning';
    return 'success';
  }

  async submit() {
    if (!this.form.valid) {
      console.log('Form is invalid');
    }
    console.log('Form is valid', this.form);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
