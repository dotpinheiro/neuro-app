import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationsPageRoutingModule } from './medications-routing.module';

import { MedicationsPage } from './medications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicationsPageRoutingModule
  ],
  declarations: [MedicationsPage]
})
export class MedicationsPageModule {}
