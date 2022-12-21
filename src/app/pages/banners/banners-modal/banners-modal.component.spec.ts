import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersModalComponent } from './banners-modal.component';

describe('BannersModalComponent', () => {
  let component: BannersModalComponent;
  let fixture: ComponentFixture<BannersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
