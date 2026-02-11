import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersModalComponent } from './users-modal/users-modal.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgToggleModule } from 'ng-toggle-button';
import { NgxPaginationModule } from 'ngx-pagination';
import { SellerApprovalModalComponent } from './seller-approval-modal/seller-approval-modal.component';
import { LoaderModule } from '@components/loader/loader.module';

@NgModule({
    declarations: [
        UsersComponent,
        UsersModalComponent,
        SellerApprovalModalComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        LoaderModule,
        BsDatepickerModule.forRoot(),
        NgToggleModule.forRoot(),
        NgxPaginationModule,
    ]
})
export class UsersModule { }
