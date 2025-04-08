import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import {ProfileService} from "./services/profile/profile.service";
import {ModalController} from "@ionic/angular";
import {FeedbackFormComponent} from "./components/feedback-form/feedback-form.component";
import {AlarmService} from "./services/alarm/alarm.service";
import {LocalNotifications} from "@capacitor/local-notifications";
import {AuthService} from "./services/auth/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _supabaseClient: SupabaseClient,
    private _authService: AuthService,
    private _profileService: ProfileService,
    private _modalController: ModalController,
    private _alarmService: AlarmService,
    private _router: Router
  ) {
  }

  async ngOnInit() {
    await LocalNotifications.checkPermissions();
    await LocalNotifications.requestPermissions();

    this._authService.authStateChanged.subscribe(async (authState) => {
      switch (authState?.event) {
        case 'INITIAL_SESSION':
        case 'SIGN_IN': {
          const { data: { user } } = await this._supabaseClient.auth.getUser();
          if(user) {
            const profiles = await this._profileService.getProfiles(user.id);
            if(profiles.length > 0) {
              await this._router.navigate(['/tabs/medications']);
              return;
            }
            await this._router.navigate(['/additional-info']);
            await this._alarmService.scheduleAlarms();
            await this.handleFeedbackForm();
          }
          return;
        }
        case 'SIGN_OUT': {
          await this._router.navigate(['/auth']);
          return;
        }
      }
    });

  }

  async handleFeedbackForm() {
    if(Math.random() < 0.3) {
      await this.openFeedbackForm();
    }
  }

  async openFeedbackForm() {
    const modal = await this._modalController.create({
      component: FeedbackFormComponent,
      componentProps: {
      },
      cssClass: 'feedback-form'
    } as any);
    await modal.present();
  }
}
