import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackHistoryPage } from './feedback-history.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackHistoryPageRoutingModule {}
