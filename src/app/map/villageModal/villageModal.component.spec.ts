/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VillageModalComponent } from './villageModal.component';

describe('VillageModalComponent', () => {
  let component: VillageModalComponent;
  let fixture: ComponentFixture<VillageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
