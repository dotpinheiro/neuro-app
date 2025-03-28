import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback/feedback.service';

@Component({
  selector: 'app-feedback-history',
  templateUrl: './feedback-history.page.html',
  styleUrls: ['./feedback-history.page.scss'],
})
export class FeedbackHistoryPage implements OnInit {
  feedbacks: any[] = [];

  constructor(public feedbackService: FeedbackService) {}

  async ngOnInit() {
    try {
      this.feedbacks = await this.feedbackService.getFeedbacks();
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  }
}
