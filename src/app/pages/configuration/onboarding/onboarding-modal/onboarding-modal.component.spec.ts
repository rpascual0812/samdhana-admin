import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingModalComponent } from './onboarding-modal.component';

describe('OnboardingModalComponent', () => {
  let component: OnboardingModalComponent;
  let fixture: ComponentFixture<OnboardingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
