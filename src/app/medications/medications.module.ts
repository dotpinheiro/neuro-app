import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationsPageRoutingModule } from './medications-routing.module';

import { FileUploadModule } from '../components/file-upload/file-upload.module';
import { AddTimerComponent } from './add-timer/add-timer.component';
import { AddComponent } from './add/add.component';
import { MedicationsPage } from './medications.page';

@NgModule({
  imports: [
    FileUploadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MedicationsPageRoutingModule,
  ],
  declarations: [MedicationsPage, AddComponent, AddTimerComponent],
})
export class MedicationsPageModule {}
