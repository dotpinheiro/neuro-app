export interface Medication {
  id: number;
  profile_id: number;
  medication_name: string;
  medication_quantity: number;
  medication_manufacturer: string;
  medication_description: string;
  medication_img?: string;
}
