import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCertificateComponent } from './update-certificate.component';

describe('UpdateCertificateComponent', () => {
  let component: UpdateCertificateComponent;
  let fixture: ComponentFixture<UpdateCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
