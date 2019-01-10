import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsaveisPage } from './responsaveis.page';

describe('ResponsaveisPage', () => {
  let component: ResponsaveisPage;
  let fixture: ComponentFixture<ResponsaveisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsaveisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsaveisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
