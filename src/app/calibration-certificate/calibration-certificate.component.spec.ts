import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalibrationCertificateComponent } from './calibration-certificate.component';

describe('CalibrationCertificateComponent', () => {
  let component: CalibrationCertificateComponent;
  let fixture: ComponentFixture<CalibrationCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalibrationCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
