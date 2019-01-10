import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosPage } from './cadastros.page';

describe('CadastrosPage', () => {
  let component: CadastrosPage;
  let fixture: ComponentFixture<CadastrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
