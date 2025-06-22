import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MedPrescription, ProfileMedication } from 'src/app/services/profile/prescription/medPrescription.interface';
import { Prescription } from 'src/app/services/profile/prescription/prescription.interface';
import { PrescriptionService } from 'src/app/services/profile/prescription/prescription.service';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.scss'],
})
export class ViewPrescriptionComponent implements OnInit{
  @Input() prescriptionItem!: Prescription;
  prescriptionProfMedi: MedPrescription[] = []

  constructor(
    private modalController: ModalController,
    private prescriptionService: PrescriptionService
  ) { }

  ngOnInit(): void {
    this.getMedcations();
  }

  async closeModal() {
    await this.modalController.dismiss()
  }

  formatDate(date: string): string {
    return (date.replace(/-/g, '/'));
  }

  async getMedcations() {
    this.prescriptionProfMedi = await this.prescriptionService.getUserMedicationsPrescription(this.prescriptionItem.id!);
  }

  showMedicationName(profMed: any) {
    console.log(profMed.medication_name)
  }
}
