import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import {TimerService} from "../profile/timer/timer.service";

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(
    private _timerService: TimerService,
  ) { }

  async scheduleAlarms(){
    const timers: any = await this._timerService.getTimers();
    for(const timer of timers){
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Time to take your medication!',
            body: `It's time to take your medication`,
            id: timer.id,
            schedule: { at: new Date(timer.time) },
            sound: 'default',
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      });
    }
  }
}
