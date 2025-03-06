import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrescriptionOccurenceComponent } from './prescription-occurence.component';

describe('PrescriptionOccurenceComponent', () => {
  let component: PrescriptionOccurenceComponent;
  let fixture: ComponentFixture<PrescriptionOccurenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionOccurenceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrescriptionOccurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
