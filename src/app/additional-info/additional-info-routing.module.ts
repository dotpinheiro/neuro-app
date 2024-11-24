import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalInfoPage } from './additional-info.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionalInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalInfoPageRoutingModule {}
