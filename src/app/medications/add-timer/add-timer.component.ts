import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams} from "@ionic/angular";
import {MedicationService} from "../../services/profile/medication/medication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TimerService} from "../../services/profile/timer/timer.service";

@Component({
  selector: 'app-add-timer',
  templateUrl: './add-timer.component.html',
  styleUrls: ['./add-timer.component.scss'],
})
export class AddTimerComponent  implements OnInit {

  form: FormGroup;
  timerId: string | null = null;
  loading: HTMLIonLoadingElement | null = null;

  weekDays = [
    { id: 1, value: 1, name: 'Domingo', active: false },
    { id: 2, value: 2, name: 'Segunda', active: false },
    { id: 3, value: 3, name: 'Terça', active: false },
    { id: 4, value: 4, name: 'Quarta', active: false },
    { id: 5, value: 5, name: 'Quinta', active: false },
    { id: 6, value: 6, name: 'Sexta', active: false },
    { id: 7, value: 7, name: 'Sábado', active: false }
  ];

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    public medService: MedicationService,
    public timerService: TimerService,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.timerId = this.navParams.get('timerId');
    this.form = this.fb.group({
      name: [null, Validators.required],
      medications: [null, Validators.required],
      time: [null, Validators.required],
      week_days: [null, Validators.required]
    })
  }

  async ngOnInit() {
    const medications = await this.medService.getMedications();
    if(this.timerId) {
      const [medicationsSchedule, timer]: any = await Promise.all([
        this.timerService.getMedicationSchedule(this.timerId),
        this.timerService.getTimerById(this.timerId),
      ]);
      timer.week_days = timer.week_days.filter((day: any) => day.active).map((day: any) => day.id.toString());
      timer.medications = medicationsSchedule.map((medication: any) => medication.profile_medication_id.toString());
      timer.time = timer.time.split('+')[0].slice(0, -3);
      this.form.patchValue(timer);
    }

    if(medications.length == 0){
      await this.presentEmptyMedicationsError();
    }
  }

  async submit(){
    if(!this.form.valid) {
      return
    }
    try{
      await this.presentLoading();
      await this.formatData();
      this.form.value.week_days = this.weekDays;
      if(this.timerId){
        await this.timerService.updateTimer(this.timerId, this.form.value);
      }else{
        await this.timerService.saveTimer(this.form.value);
      }
      await this.timerService.getTimers();
      await this.modalController.dismiss(this.form.value);
    }catch(e){
      console.error(e)
    }finally {
      this.loading?.dismiss();
    }

  }

  async formatData(){
    const selectedDays = this.form.value.week_days;
    console.log(selectedDays);
    console.log(this.weekDays)
    this.weekDays = this.weekDays.map(day => {
      day.active = selectedDays.includes(day.id.toString());
      return day;
    });
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create({
      message: `${this.timerId ? 'Atualizando' : 'Adicionando'} horário...`,
      spinner: 'bubbles'
    });
    await this.loading.present();
  }

  async presentEmptyMedicationsError() {
    const alert = await this.alertCtrl.create({
      header: 'Erro',
      message: 'Você precisa ter ao menos um medicamento cadastrado para definir os horários.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
