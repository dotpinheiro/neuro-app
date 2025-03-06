import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrescriptionPageRoutingModule } from './prescription-routing.module';

import { PrescriptionPage } from './prescription.page';

import { PrescriptionOccurenceComponent } from './components/prescription-occurence/prescription-occurence.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrescriptionPageRoutingModule
  ],
  declarations: [PrescriptionPage, PrescriptionOccurenceComponent]
})
export class PrescriptionPageModule {}
