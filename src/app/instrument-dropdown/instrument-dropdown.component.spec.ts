import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentDropdownComponent } from './instrument-dropdown.component';

describe('InstrumentDropdownComponent', () => {
  let component: InstrumentDropdownComponent;
  let fixture: ComponentFixture<InstrumentDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
