import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadorPage } from './cuidador.page';

describe('CuidadorPage', () => {
  let component: CuidadorPage;
  let fixture: ComponentFixture<CuidadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuidadorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuidadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
