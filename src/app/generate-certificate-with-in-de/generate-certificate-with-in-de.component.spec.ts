import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCertificateWithInDeComponent } from './generate-certificate-with-in-de.component';

describe('GenerateCertificateWithInDeComponent', () => {
  let component: GenerateCertificateWithInDeComponent;
  let fixture: ComponentFixture<GenerateCertificateWithInDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateCertificateWithInDeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCertificateWithInDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
