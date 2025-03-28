import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback/feedback.service';

@Component({
  selector: 'app-feedback-history',
  templateUrl: './feedback-history.page.html',
  styleUrls: ['./feedback-history.page.scss'],
})
export class FeedbackHistoryPage implements OnInit {
  constructor(
    public feedbackService: FeedbackService
  ) {}

  async ngOnInit() {
    try {
      const feedbacks = await this.feedbackService.getFeedbacks();
      console.log('Feedbacks:', feedbacks);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  }
}
