import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { Prescription } from "./prescription.interface";
import { PrescriptionMedItem } from "./prescriptionsMedItem.interface";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
    constructor(
        private _supabase: SupabaseClient,
    ) {}

    async addPrescription(prescription: Prescription) {
        const { data, error } = await this._supabase.from('base_prescription').insert({
            ...prescription
        })
        .select();

        if(error) {
            throw error;
        }

        const newId = data[0].id;
        return newId;
    }

    async addMedicationsPrescription(prescriptionMedItem: PrescriptionMedItem) {
        const { error } = await this._supabase.from('base_prescription_profile_medication').insert({
            ...prescriptionMedItem
        })

        if(error) {
            throw error;
        }
    }
}