import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MedicationService } from "../../services/profile/medication/medication.service";
import { FeedbackService } from "../../services/feedback/feedback.service";

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
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.form = this.fb.group({
      medication_name: [null, Validators.required],
      medication_manufacturer: [null, Validators.required],
      medication_description: [null],
    });
  }

  async enviarFeedback() {
    const feedbackData = {
      humor: this.humor,
      sintomas: this.sintomas,
    };

    const loading = await this.loadingCtrl.create({
      message: 'Enviando feedback...',
    });
    await loading.present();

    try {
      await this.feedbackService.saveFeedback(feedbackData);
      const toast = await this.toastController.create({
        message: 'Humor enviado com sucesso!',
        duration: 2000,
        color: 'success',
      });
      await toast.present();
      await this.modalController.dismiss();
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Não foi possível enviar o feedback. Tente novamente mais tarde.',
        buttons: ['OK'],
      });
      await alert.present();
    } finally {
      await loading.dismiss();
    }
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
