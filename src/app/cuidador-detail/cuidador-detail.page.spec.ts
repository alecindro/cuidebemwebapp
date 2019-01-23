import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadorDetailPage } from './cuidador-detail.page';

describe('CuidadorDetailPage', () => {
  let component: CuidadorDetailPage;
  let fixture: ComponentFixture<CuidadorDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuidadorDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuidadorDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
