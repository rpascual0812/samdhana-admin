import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerApprovalModalComponent } from './seller-approval-modal.component';

describe('SellerApprovalModalComponent', () => {
  let component: SellerApprovalModalComponent;
  let fixture: ComponentFixture<SellerApprovalModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerApprovalModalComponent]
    });
    fixture = TestBed.createComponent(SellerApprovalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
