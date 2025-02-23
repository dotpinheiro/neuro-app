import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationsPageRoutingModule } from './medications-routing.module';

import { MedicationsPage } from './medications.page';
import {AddComponent} from "./add/add.component";
import {AddTimerComponent} from "./add-timer/add-timer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MedicationsPageRoutingModule
  ],
  declarations: [MedicationsPage, AddComponent, AddTimerComponent],
})
export class MedicationsPageModule {}
