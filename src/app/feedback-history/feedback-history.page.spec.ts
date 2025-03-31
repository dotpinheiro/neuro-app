import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackHistoryPage } from './feedback-history.page';

describe('FeedbackHistoryPage', () => {
  let component: FeedbackHistoryPage;
  let fixture: ComponentFixture<FeedbackHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
