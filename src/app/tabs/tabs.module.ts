import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { HeaderModule } from '../components/header/header.module';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    HeaderModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    HeaderModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
