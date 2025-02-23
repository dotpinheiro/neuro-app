import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {AddComponent} from "./add/add.component";
import {AddTimerComponent} from "./add-timer/add-timer.component";
import {MedicationService} from "../services/profile/medication/medication.service";
import {TimerService} from "../services/profile/timer/timer.service";

@Component({
  selector: 'app-medications',
  templateUrl: './medications.page.html',
  styleUrls: ['./medications.page.scss'],
})
export class MedicationsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    public medService: MedicationService,
    public timerService: TimerService
  ) { }

  async ngOnInit() {
    await Promise.all([
      this.medService.getMedications(),
      this.timerService.getTimers()
    ]);
  }

  async addMed() {
    const modal = await this.modalCtrl.create({
      component: AddComponent
    } as any)
    await modal.present();
  }

  async editMed(medicationId: number){
    const modal = await this.modalCtrl.create({
      component: AddComponent,
      componentProps: {
        medicationId
      }
    } as any)
    await modal.present();
  }

  async addTimer() {
    const modal = await this.modalCtrl.create({
      component: AddTimerComponent
    } as any)
    await modal.present();
  }

  async editTimer(timerId: number){
    const modal = await this.modalCtrl.create({
      component: AddTimerComponent,
      componentProps: {
        timerId
      }
    } as any)
    await modal.present();
  }

  async deleteMedication(medicationId: string) {
    await this.medService.deleteMedication(medicationId);
    await this.medService.getMedications();
  }

  async deleteTimer(timerId: string) {
    await this.timerService.deleteTimer(timerId);
    await this.timerService.getTimers();
  }

}
