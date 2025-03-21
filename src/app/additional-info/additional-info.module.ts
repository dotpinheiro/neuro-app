import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalInfoPageRoutingModule } from './additional-info-routing.module';

import { AdditionalInfoPage } from './additional-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdditionalInfoPageRoutingModule
  ],
  declarations: [AdditionalInfoPage]
})
export class AdditionalInfoPageModule {}
