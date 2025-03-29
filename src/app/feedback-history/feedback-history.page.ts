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

  getHumorIcon(humor: number): string {
    if (humor >= 0 && humor <= 3) {
      return 'sad-outline';
    } else if (humor >= 4 && humor <= 6) {
      return 'hand-right-outline';
    } else if (humor >= 7 && humor <= 10) {
      return 'happy-outline';
    }
    return 'help-outline'; 
  }

  getHumorColor(humor: number): string {
    if (humor >= 0 && humor <= 3) {
      return 'red';
    } else if (humor >= 4 && humor <= 6) {
      return 'yellow';
    } else if (humor >= 7 && humor <= 10) {
      return 'green';
    }
    return 'gray';
  }
}
