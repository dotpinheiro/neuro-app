import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionalInfoPage } from './additional-info.page';

describe('AdditionalInfoPage', () => {
  let component: AdditionalInfoPage;
  let fixture: ComponentFixture<AdditionalInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
