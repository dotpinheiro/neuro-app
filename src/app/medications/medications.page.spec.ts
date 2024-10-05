import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicationsPage } from './medications.page';

describe('MedicationsPage', () => {
  let component: MedicationsPage;
  let fixture: ComponentFixture<MedicationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
