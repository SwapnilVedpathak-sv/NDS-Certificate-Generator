import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCertificateComponent } from './list-of-certificate.component';

describe('ListOfCertificateComponent', () => {
  let component: ListOfCertificateComponent;
  let fixture: ComponentFixture<ListOfCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
