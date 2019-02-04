import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoModalPage } from './evento-modal.page';

describe('EventoModalPage', () => {
  let component: EventoModalPage;
  let fixture: ComponentFixture<EventoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
