import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackHistoryPageRoutingModule } from './feedback-history-routing.module';

import { FeedbackHistoryPage } from './feedback-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackHistoryPageRoutingModule
  ],
  declarations: [FeedbackHistoryPage]
})
export class FeedbackHistoryPageModule {}
