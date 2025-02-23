import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MedicationService} from "../../services/profile/medication/medication.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  form: FormGroup;
  loading: HTMLIonLoadingElement | null = null;
  medicationId: string | null = null;

  constructor(
    private modalController: ModalController,
    private medService: MedicationService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      medication_name: [null, Validators.required],
      medication_manufacturer: [null, Validators.required],
      medication_description: [null],
    });
  }

  async ngOnInit() {
    this.medicationId = this.navParams.get('medicationId');
    if(this.medicationId) {
      const medication = await this.medService.getMedicationById(this.medicationId);
      this.form.patchValue(medication);
    }
  }

  async submit() {
    if(!this.form.valid) {
      return this.presentFormError();
    }
    try{
      await this.presentLoading();
      if(this.medicationId){
        await this.medService.updateMedication(this.medicationId, this.form.value);
      }else{
        await this.medService.addMedication(this.form.value);
      }
      await this.medService.getMedications();
      await this.modalController.dismiss(this.form.value);
    }catch(e){
      console.error(e);
    }finally {
      await this.loading?.dismiss();
    }
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create({
      message: `${this.medicationId ? 'Atualizando' : 'Adicionando'} medicação...`,
      spinner: 'bubbles'
    });
    await this.loading.present();
  }

  async presentFormError() {
    const alert = await this.alertCtrl.create({
      header: 'Erro',
      message: 'Preencha todos os campos obrigatórios marcados com (*)',
      buttons: ['OK']
    });
    await alert.present();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
