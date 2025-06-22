export interface ProfileMedication {
    medication_name: string;
}

export interface MedPrescription{
    id_prescription: number;
    profile_medications: any;
    dosage: number;
    information: string;
}