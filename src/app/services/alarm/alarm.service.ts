import { Injectable } from '@angular/core';
import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import {TimerService} from "../profile/timer/timer.service";

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(
    private _timerService: TimerService,
  ) {

    LocalNotifications.registerActionTypes({
      types: [
{
          id: 'TAKE_MEDICINE',
          actions: [
            {
              id: 'take',
              title: 'Já tomei'
            }
          ]
        }
      ]
    })

    LocalNotifications.createChannel({
      id: 'medicines',
      name: 'Medicamentos',
      description: 'Notificações de medicamentos',
      importance: 5,
      visibility: 1,
      sound: "beeping.mp3",
      vibration: true,
    })

    this._timerService.updatedEvent.subscribe(async () => {
      await this.scheduleAlarms();
    });
  }

  async scheduleAlarms(){
    await this.cancelAlarms();
    const timers: any = await this._timerService.getTimers();
    for(const timer of timers){
      if(!timer.status) continue;
      const [hours, minutes] = timer.time.split(':');
      const medications = await this._timerService.getMedicationsByTimerId(timer.id);
      const notifications: LocalNotificationSchema[] = timer.week_days.map((weekday: any) => (
        {
          title: `🔔 Hora do medicamento! ${timer.name}`,
          body: `Tome os medicamentos:${medications?.map((medication: any) => medication.profile_medications.medication_name).join(', ')}`,
          id: timer.id * 10 + weekday.value,
          schedule: {
            on: {
              weekday: weekday.value,
              hour: hours,
              minute: minutes
            },
            allowWhileIdle: true
          },
          channelId: 'medicines',
        }
      ));


      await LocalNotifications.schedule({
        notifications
      });
    }
    console.log(await LocalNotifications.getPending())

  }

  async cancelAlarms(){
    const pending = await LocalNotifications.getPending();
    console.log("pending", pending)
    if(pending.notifications.length == 0) return;
    await LocalNotifications.cancel({
      notifications: pending.notifications
    });
  }
}
