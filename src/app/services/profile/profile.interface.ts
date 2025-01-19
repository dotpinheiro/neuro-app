
export enum ProfileScopes {
  USER = 'user',
  DOCTOR = 'doctor',
  CAREGIVER = 'caregiver',
}

export enum SexEnum {
  MEN = 'm',
  wOMAN = 'f',
  OTHER = 'o',
}

export interface ProfileInterface {
  id?: string;
  name: string;
  age: number
  sex: SexEnum;
  img?: string;
  medication_started_at: string;
  height: number;
  weight: number

}
