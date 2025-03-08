import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrescriptionPageRoutingModule } from './prescription-routing.module';

import { PrescriptionPage } from './prescription.page';

import { PrescriptionOccurenceComponent } from './components/prescription-occurence/prescription-occurence.component';
import { AddPrescriptionComponent } from './components/add-prescription/add-prescription.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrescriptionPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PrescriptionPage, PrescriptionOccurenceComponent, AddPrescriptionComponent]
})
export class PrescriptionPageModule {}
