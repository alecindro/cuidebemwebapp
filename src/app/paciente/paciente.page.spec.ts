import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientePage } from './paciente.page';

describe('PacientePage', () => {
  let component: PacientePage;
  let fixture: ComponentFixture<PacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
