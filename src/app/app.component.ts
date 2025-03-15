import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import {ProfileService} from "./services/profile/profile.service";
import {ModalController} from "@ionic/angular";
import {FeedbackFormComponent} from "./components/feedback-form/feedback-form.component";
import { requestForToken } from 'src/firebase';
import {AlarmService} from "./services/alarm/alarm.service";
import {LocalNotifications} from "@capacitor/local-notifications";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _supabaseClient: SupabaseClient,
    private _profileService: ProfileService,
    private _modalController: ModalController,
    private _alarmService: AlarmService,
    private _router: Router
  ) {
    if(localStorage.getItem('logged') === 'true') {
      this._router.navigate(['/tabs/medications']);
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

  async ngOnInit() {
    await LocalNotifications.requestPermissions();
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Remedinho bora?',
          body: `bora bora?`,
          id: 1,
          schedule: { at: new Date(Date.now()) },
          sound: 'default',
          attachments: undefined,
          actionTypeId: '',
          extra: null
        }
      ]
    })
    await this._alarmService.scheduleAlarms();
    await this.openFeedbackForm();

    this._supabaseClient.auth.onAuthStateChange(async (event, session) => {
      console.debug(event, session)
      if((event === 'INITIAL_SESSION' || event === 'SIGNED_IN') && session !== null) {
        console.debug('User signed in');
        const profiles = await this._profileService.getProfiles(session.user.id);
        localStorage.setItem('logged', 'true');
        if(profiles.length > 0) {
            await this._router.navigate(['/tabs/medications']);
          return;
        }
        await this._router.navigate(['/additional-info']);
      }

      if(event === 'SIGNED_OUT') {
        console.log('User signed out');
        localStorage.removeItem('logged');
        await this._router.navigate(['/auth']);
      }
    });
  }
}
