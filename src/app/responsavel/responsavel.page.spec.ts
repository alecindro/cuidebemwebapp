import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelPage } from './responsavel.page';

describe('ResponsavelPage', () => {
  let component: ResponsavelPage;
  let fixture: ComponentFixture<ResponsavelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsavelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
