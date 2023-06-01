import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceModalComponent } from './province-modal.component';

describe('ProvinceModalComponent', () => {
  let component: ProvinceModalComponent;
  let fixture: ComponentFixture<ProvinceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
