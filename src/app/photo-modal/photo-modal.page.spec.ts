import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoModalPage } from './photo-modal.page';

describe('PhotoModalPage', () => {
  let component: PhotoModalPage;
  let fixture: ComponentFixture<PhotoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
