import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendasDefPage } from './agendasdef.page';

describe('AgendasPage', () => {
  let component: AgendasDefPage;
  let fixture: ComponentFixture<AgendasDefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendasDefPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendasDefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
