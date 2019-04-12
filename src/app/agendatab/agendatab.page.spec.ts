import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendatabPage } from './agendatab.page';

describe('AgendatabPage', () => {
  let component: AgendatabPage;
  let fixture: ComponentFixture<AgendatabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendatabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendatabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
