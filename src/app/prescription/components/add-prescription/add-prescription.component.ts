import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, ModalController } from '@ionic/angular';
import { Medication } from 'src/app/services/profile/medication/medication.interface';
import { MedicationService } from 'src/app/services/profile/medication/medication.service';
import { PrescriptionService } from 'src/app/services/profile/prescription/prescription.service';
import { PrescriptionMedItem } from 'src/app/services/profile/prescription/prescriptionsMedItem.interface';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss'],
})
export class AddPrescriptionComponent{
  prescriptionForm: FormGroup;
  medicationForm: FormGroup;
  currentStep = 1;
  medicationsList: Medication[] = []
  dosageUnit = ['mg', 'mcg', 'UI', 'g', 'mL', '%']
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private medicationService: MedicationService
  ) { 
    this.prescriptionForm = fb.group({
      issue_date: [new Date().toISOString(), Validators.required],
      expiration_date: [new Date().toISOString(), Validators.required],
      doctor_name: [null, Validators.required],
      description: [null, Validators.maxLength(500)],
      medications: this.fb.array([], Validators.required)
    })

    this.medicationForm = fb.group({
      medicationId: ['', Validators.required],
      dosage: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.getProfileMedications().then((medicationsRetrieve: Medication[]) => {
      this.medicationsList = medicationsRetrieve;
    }).catch((error) => {
      console.error('Erro ao buscar medicações', error)
    });
  }

  getProfileMedications(): Promise<Medication[]> {
    return this.medicationService.getMedications()
  }

  createMedication(medicationId: number, dosage: number, instruction: string) {
    return this.fb.group({
      medicationId: [medicationId, Validators.required],
      dosage: [dosage, Validators.required],
      instruction: [instruction]
    });
  }

  addMedication() {
    const medicationId = this.medicationForm.get('medicationId')?.value;
    const dosage = this.medicationForm.get('dosage')?.value;
    const description = this.medicationForm.get('description')?.value;

    this.medications.push(this.createMedication(medicationId, dosage, description));

    this.clearMedication();

    console.log(this.medications.controls.values);
  }

  clearMedication() {
    this.medicationForm.patchValue({
      medicationId: '',
      dosage: '',
      description: ''
    })
  }

  removeMedication(index: number) {
    this.medications.removeAt(index);
  }

  getMedicationName(medId: number) {
    const medication = this.medicationsList.find(medication => medication.id === medId);
    const medName = medication?.medication_name
    return medName
  }

  get medications() {
    return this.prescriptionForm.get('medications') as FormArray;
  }

  nexStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
    console.log(this.currentStep)
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  saveBasePrescription(): Promise<number> {
    console.log(this.prescriptionForm.value)
 
    const prescriptionId = this.prescriptionService.addPrescription(this.prescriptionForm.value);

    return prescriptionId;
  }

  async submit() {
    const prescriptionId = await this.saveBasePrescription()

    this.medications.controls.forEach(med => {
      const prescMedItem: PrescriptionMedItem = {
        id_prescription: prescriptionId,
        id_medication: med.get('medicationId')?.value,
        dosage: med.get('dosage')?.value,
        information: med.get('description')?.value
      }

      this.prescriptionService.addMedicationsPrescription(prescMedItem);
    })
  }

  async closeModal() {
    await this.modalController.dismiss()
  }
}
