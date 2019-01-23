import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTelefonePage } from './modal-telefone.page';

describe('ModalTelefonePage', () => {
  let component: ModalTelefonePage;
  let fixture: ComponentFixture<ModalTelefonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTelefonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTelefonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
