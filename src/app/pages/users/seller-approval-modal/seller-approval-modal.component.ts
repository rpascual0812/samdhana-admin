import { Component, EventEmitter, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as _ from '../../../utilities/globals';
import { ToastrService } from 'ngx-toastr';
import { SellerService } from '@services/seller.service';
import Swal from 'sweetalert2';
import { UserService } from '@services/user.service';

import { LoaderComponent } from '@components/loader/loader.component';

@Component({
    selector: 'app-seller-approval-modal',
    templateUrl: './seller-approval-modal.component.html',
    styleUrls: ['./seller-approval-modal.component.scss']
})
export class SellerApprovalModalComponent {
    @ViewChild(LoaderComponent) loader: LoaderComponent;
    public callback: EventEmitter<any> = new EventEmitter();

    title?: string;
    saveBtnName?: string;
    closeBtnName?: string;
    activateBtnName?: string;
    user: any = {};

    seller: any = {};
    displayPhotos: any = [];
    attachedDocuments: any = [];

    constructor(
        public bsModalRef: BsModalRef,
        private sellerService: SellerService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.fetchSellerRegistrationInfo();
    }

    fetchSellerRegistrationInfo() {
        setTimeout(() => { this.loader.toggle(); }, 500);
        this.sellerService
            .fetch(this.user.seller.pk)
            .subscribe({
                next: (data: any) => {
                    console.log(1, data.user);
                    this.seller = data.user;

                    this.displayPhotos = this.seller.seller_document.filter((doc: any) => doc.type == 'profile_photo');
                    this.attachedDocuments = this.seller.seller_document.filter((doc: any) => doc.type == 'document');
                },
                error: (error: any) => {
                    console.log(error);
                    setTimeout(() => { this.loader.toggle(); }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loader.toggle(); }, 500);
                }
            });
    }

    submit() {
        Swal.fire({
            icon: 'question',
            title: 'Are you sure your want to approve ' + this.user.first_name + ' as a producer?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, approve',
            confirmButtonColor: '#28a745',
            denyButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.userService.approveProducer(this.user).subscribe({
                    next: (data: any) => {
                        this.user.is_seller = true;
                        this.callback.emit({ data });
                    },
                    error: (error: any) => {
                        console.log(error);
                    },
                    complete: () => {
                        console.log('Complete');
                    }
                });
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
}
