import { Injectable } from '@angular/core';
import {Medication} from "./medication.interface";
import {SupabaseClient} from "@supabase/supabase-js";
import {ProfileService} from "../profile.service";

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  private _medications: Medication[] = [];

  constructor(
    private _supabase: SupabaseClient,
    private _profileService: ProfileService
  ) { }

  async getMedications() {
    const currentProfile = await this._profileService.getCurrentProfile();
    const { data, error } = await this._supabase
      .from('profile_medications')
      .select('*')
      .is('deleted_at', null)
      .eq('profile_id', currentProfile.id);

    if(error) {
      throw error;
    }

    this.medications = data as Medication[];
    return this.medications;
  }

  async getMedicationById(medicationId: string) {
    const { data, error } = await this._supabase.from('profile_medications').select('*')
      .is('deleted_at', null)
      .eq('id', medicationId).maybeSingle();
    if(error) {
      throw error;
    }
    return data as Medication;
  }

  async deleteMedication(medicationId: string) {
    const { data, error } = await this._supabase.from('profile_medications').update({
      deleted_at: new Date()
    }).eq('id', medicationId).select();
    if(error) {
      throw error;
    }
    return data;
  }

  async addMedication(medication: Medication) {
    const currentProfile = await this._profileService.getCurrentProfile();
    const { error } = await this._supabase.from('profile_medications').insert({
      ...medication,
      profile_id: currentProfile.id
    });

    if(error) {
      throw error;
    }
  }

  async updateMedication(id: string, medication: Medication) {
    const { error } = await this._supabase.from('profile_medications').update({
      ...medication
    }).eq('id', id);
    if(error) {
      throw error;
    }
  }

  get medications() {
    return this._medications;
  }

  set medications(medications: Medication[]) {
    this._medications = medications;
  }

}
