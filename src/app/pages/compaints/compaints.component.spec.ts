import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaintsComponent } from './compaints.component';

describe('CompaintsComponent', () => {
  let component: CompaintsComponent;
  let fixture: ComponentFixture<CompaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
