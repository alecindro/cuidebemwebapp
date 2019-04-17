import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendatabmodalPage } from './agendatabmodal.page';

describe('AgendatabmodalPage', () => {
  let component: AgendatabmodalPage;
  let fixture: ComponentFixture<AgendatabmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendatabmodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendatabmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
