import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Medication } from 'src/app/services/profile/medication/medication.interface';
import { MedicationService } from 'src/app/services/profile/medication/medication.service';
import { PrescriptionService } from 'src/app/services/profile/prescription/prescription.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss'],
})
export class AddPrescriptionComponent{
  form: FormGroup;
  currentStep = 1;
  medicationsList: Medication[] = []

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private medicationService: MedicationService
  ) { 
    this.form = fb.group({
      issue_date: [new Date().toISOString(), Validators.required],
      expiration_date: [new Date().toISOString(), Validators.required],
      doctor_name: [null, Validators.required],
      description: [null, Validators.maxLength(500)],
      medications: this.fb.array([this.createMedication()], Validators.required)
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

  createMedication() {
    return this.fb.group({
      medicationId: ['', Validators.required],
      dosagem: ['', Validators.required],
      instruction: ['']
    });
  }

  addMedication() {
    this.medications.push(this.createMedication());
  }

  removeMedication(index: number) {
    this.medications.removeAt(index);
  }

  get medications() {
    return this.form.get('medications') as FormArray;
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

  submit() {
    console.log(this.form.value)
    try{
      this.prescriptionService.addPrescription(this.form.value);
    }catch(e){
      console.log("Erro ao cadastrar receita" + e);
    }finally{

    }
  }

  async closeModal() {
    await this.modalController.dismiss()
  }
}
