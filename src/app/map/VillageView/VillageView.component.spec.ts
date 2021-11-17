/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VillageViewComponent } from './VillageView.component';

describe('VillageViewComponent', () => {
  let component: VillageViewComponent;
  let fixture: ComponentFixture<VillageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
