import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalInfoPageRoutingModule } from './additional-info-routing.module';

import { AdditionalInfoPage } from './additional-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionalInfoPageRoutingModule
  ],
  declarations: [AdditionalInfoPage]
})
export class AdditionalInfoPageModule {}
