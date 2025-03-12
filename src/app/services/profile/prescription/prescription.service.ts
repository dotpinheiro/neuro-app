import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { Prescription } from "./prescription.interface";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
    constructor(
        private _supabase: SupabaseClient,
    ) {}

    async addPrescription(prescription: Prescription) {
        const { error } = await this._supabase.from('base_prescription').insert({
            ...prescription
        });

        if(error) {
            throw error;
        }
    }
}