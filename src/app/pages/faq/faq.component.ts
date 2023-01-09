import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { FaqModalComponent } from './faq-modal/faq-modal.component';
import { FaqService } from '@services/faq.service';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
    bsModalRef?: BsModalRef;

    loading: boolean = false;
    faqs: any = [];
    filters: any = {};

    constructor(
        private faqService: FaqService,
        private toastr: ToastrService,
        private modalService: BsModalService,
        private cdr: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.filters = {
            keyword: '',
        };

        this.fetch();
    }

    fetch() {
        this.faqService.fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    // console.log('faq', data.data);
                    this.faqs = data.data;
                },
                error: (error: any) => {
                    console.log(error);
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                }
            });
    }

    openModal(faq: any) {
        const title = faq ? 'Edit ' + faq.title : 'Add FAQ';

        const initialState: ModalOptions = {
            class: 'modal-lg',
            initialState: {
                title: title,
                faq: faq,
            }
        };
        this.bsModalRef = this.modalService.show(FaqModalComponent, initialState);
        this.bsModalRef.content.saveBtnName = 'Save';
        this.bsModalRef.content.closeBtnName = 'Close';

        this.bsModalRef.content.callback.subscribe(res => {
            this.fetch();
            this.cdr.detectChanges();
        });
    }

    delete(faq) {
        Swal.fire({
            icon: 'question',
            title: 'Are you sure your want to delete ' + faq.question + '?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            confirmButtonColor: '#dc3545',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.faqService.update(faq.pk, { archived: true })
                    .subscribe({
                        next: (data: any) => {
                            console.log('faq', data.data);
                            this.fetch();
                        },
                        error: (error: any) => {
                            console.log(error);
                            setTimeout(() => { this.loading = false; }, 500);
                        },
                        complete: () => {
                            console.log('Complete');
                            setTimeout(() => { this.loading = false; }, 500);
                        }
                    });
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })


    }

}
