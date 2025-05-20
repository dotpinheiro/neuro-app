export interface Prescription{
    id?: number;
    // id_profile: number
    issue_date: string;
    expiration_date: string;
    doctor_name: string;
    description: string;
}