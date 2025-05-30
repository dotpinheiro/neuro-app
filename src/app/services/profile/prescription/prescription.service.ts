import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { Prescription } from "./prescription.interface";
import { PrescriptionMedItem } from "./prescriptionsMedItem.interface";
import { UserService } from "../../user/user.service";
import { promises } from "dns";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
    constructor(
        private _supabase: SupabaseClient,
        private userService: UserService
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
    
    async getUserPrescrptions(): Promise<Prescription[]> {
        try {
            const userId = await this.userService.getUserProfileId();
            const { data, error } = await this._supabase
                .from('base_prescription')
                .select('*')
                .eq('id_profile', userId);
    
            if (data) {
                return data.map(prescription => ({
                    id: prescription.id,
                    id_profile: prescription.id_profile,
                    issue_date: prescription.issue_date,
                    expiration_date: prescription.expiration_date,
                    doctor_name: prescription.doctor_name,
                    description: prescription.description
                }));
            }
            return [];
        } catch (e) {
            console.error('Erro ao consultar prescrições:', e);
            throw e; // Re-levanta o erro
        }
    }
    
}