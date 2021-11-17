/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VillageCommandComponent } from './VillageCommand.component';

describe('VillageCommandComponent', () => {
  let component: VillageCommandComponent;
  let fixture: ComponentFixture<VillageCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillageCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
