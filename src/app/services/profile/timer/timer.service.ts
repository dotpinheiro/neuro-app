import { Injectable } from '@angular/core';
import {SupabaseClient} from "@supabase/supabase-js";
import {ProfileService} from "../profile.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timers: any = [];
  private _updatedEvent = new BehaviorSubject(this.timers);

  constructor(
    private _supabase: SupabaseClient,
    private _profileService: ProfileService,
  ) { }

  async getTimers() {
    const currentProfile = await this._profileService.getCurrentProfile();

    const { data, error } = await this._supabase.from('profile_schedule').select('*')
      .eq('profile_id', currentProfile.id)
      .is('deleted_at', null).order('created_at', { ascending: true });
    if(error) {
      throw error;
    }
    this.timers = data;
    return data;
  }

  async getMedicationsByTimerId(timerId: string) {
    const { data, error } = await this._supabase.from('profile_medications_schedule').select(`
      profile_medications (medication_name, medication_manufacturer)
    `)
      .eq('profile_schedule_id', timerId);
    if(error) {
      throw error;
    }
    return data;
  }

  async getTimerById(timerId: string) {
    const currentProfile = await this._profileService.getCurrentProfile();
    const { data, error } = await this._supabase.from('profile_schedule').select('*')
      .eq('profile_id', currentProfile.id)
      .is('deleted_at', null).eq('id', timerId).maybeSingle();
    if(error) {
      throw error;
    }
    return data;
  }

  async saveTimer(timer: any) {
    const { data, error }: any = await this.insertSchedule(timer);
    if(error) {
      throw error;
    }

    await Promise.all(timer.medications?.map((medicationId: string) => this.insertMedicationSchedule(medicationId, data[0]?.id)));
    this.triggerUpdateEvent();
  }

  async updateTimer(timerId: string, timer: any) {
    const { data, error }: any = await this.updateSchedule(timerId, timer);
    if(error) {
      throw error;
    }

    await Promise.all(timer.medications?.map((medicationId: string) => this.updateMedicationSchedule(medicationId, timer.id)));
    this.triggerUpdateEvent();
  }

  async insertSchedule(timer: any) {
    const currentProfile = await this._profileService.getCurrentProfile();
    return this._supabase.from('profile_schedule').insert({
      profile_id: currentProfile.id,
      name: timer.name,
      time: timer.time,
      week_days: timer.week_days
    }).select();
  }

  async insertMedicationSchedule(profileMedicationId: string, scheduleId: string) {
    return this._supabase.from('profile_medications_schedule').insert({
      profile_medication_id: profileMedicationId,
      profile_schedule_id: scheduleId
    }).select();
  }

  async updateSchedule(timerId: string, timer: any) {
    const currentProfile = await this._profileService.getCurrentProfile();
    const { data, error } = await this._supabase.from('profile_schedule').update({
      profile_id: currentProfile.id,
      name: timer.name,
      time: timer.time,
      week_days: timer.week_days
    }).eq('id',timerId).select();
    if(error) {
      throw error;
    }
    return data;
  }

  async updateMedicationSchedule(profileMedicationId: string, scheduleId: string) {
    await this._supabase.from('profile_medications_schedule').delete().eq('profile_schedule_id', scheduleId).select();
    return this._supabase.from('profile_medications_schedule').insert({
      profile_medication_id: profileMedicationId,
      profile_schedule_id: scheduleId
    }).select();
  }

  async toggleStatus(timer: any) {
    const { data, error } = await this._supabase.from('profile_schedule').update({
      status: timer.status
    }).eq('id', timer.id).select();
    if(error) {
      throw error;
    }
    this.triggerUpdateEvent();
    return data;
  }

  async deleteTimer(timerId: string) {
    const currentProfile = await this._profileService.getCurrentProfile();
    const { data, error } = await this._supabase.from('profile_schedule').update({
      deleted_at: new Date()
    })
      .eq('profile_id', currentProfile.id)
      .eq('id', timerId).select();
    if(error) {
      throw error;
    }
    this.triggerUpdateEvent();
    return data;
  }

  async getMedicationSchedule(timerId: string) {
    const { data, error } = await this._supabase.from('profile_medications_schedule').select('*')
      .eq('profile_schedule_id', timerId);
    if(error) {
      throw error;
    }
    return data;
  }

  private triggerUpdateEvent() {
    this._updatedEvent.next(this.timers);
  }

  get updatedEvent() {
    return this._updatedEvent.asObservable();
  }
}
