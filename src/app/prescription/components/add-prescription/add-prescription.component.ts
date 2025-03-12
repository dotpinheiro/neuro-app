import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PrescriptionService } from 'src/app/services/profile/prescription/prescription.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss'],
})
export class AddPrescriptionComponent{
  form: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService
  ) { 
    this.form = fb.group({
      issue_date: [new Date().toISOString(), Validators.required],
      expiration_date: [new Date().toISOString(), Validators.required],
      doctor_name: [null, Validators.required],
      description: [null, Validators.maxLength(500)]
    })
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
