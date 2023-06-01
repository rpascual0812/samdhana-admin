import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProvinceService } from '@services/province.service';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as _ from '../../../../utilities/globals';

@Component({
    selector: 'app-province-modal',
    templateUrl: './province-modal.component.html',
    styleUrls: ['./province-modal.component.scss']
})
export class ProvinceModalComponent implements OnInit {
    public callback: EventEmitter<any> = new EventEmitter();
    loading: boolean = false;
    title?: string;
    saveBtnName?: string;
    closeBtnName?: string;
    province: any = {};
    filters: any = {};

    submitted: boolean = false;
    form: FormGroup;

    constructor(
        private provinceService: ProvinceService,
        public bsModalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.filters = {
            search: '',
            skip: 0,
            take: 10
        };

        this.setForm();
    }

    get f() { return this.form.controls; }

    setForm() {
        this.form = this.formBuilder.group({
            pk: [''],
            province_code: [this.province ? this.province.province_code : '', Validators.required],
            name: [this.province ? this.province.name : '', Validators.required],
            archived: [this.province ? this.province.archived : false]
        });
    }

    submit() {
        this.loading = true;
        // console.log('submitting');
        this.submitted = true;
        // console.log(this.form.invalid);
        // console.log(this.form.value);
        if (this.form.invalid) {
            return;
        }

        this.form.get('pk').patchValue(this.province.pk);
        this.provinceService
            .save(this.form.value)
            .subscribe({
                next: (data: any) => {
                    this.callback.emit({ data });
                    this.toastr.success('The province has been successfully saved', 'SUCCESS!');
                },
                error: (error: any) => {
                    console.log(error);
                    this.toastr.error('An error occurred while updating the province. Please try again', 'ERROR!');
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                    this.bsModalRef.hide();
                }
            });
    }

    delete() {
        Swal.fire({
            title: '<strong>Are you sure you want to delete ' + this.province.name + '?</strong>',
            icon: 'question',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Yes!',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> No, cancel',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.provinceService
                    .delete(this.province)
                    .subscribe({
                        next: (data: any) => {
                            this.province.archived = true;
                            this.callback.emit({ data: this.province });
                            this.toastr.success('The province has been successfully deleted', 'SUCCESS!');
                            this.bsModalRef.hide();
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
        })
    }
}
