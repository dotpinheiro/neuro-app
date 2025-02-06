import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export type PredefinedColors =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'medium'
  | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    message: string,
    duration: number = 2000,
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    color: PredefinedColors = 'success'
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: color,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }
}
