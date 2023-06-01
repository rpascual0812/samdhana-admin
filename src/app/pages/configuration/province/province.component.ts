import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as _ from '../../../utilities/globals';
import Swal from 'sweetalert2';

import { UserService } from '@services/user.service';
import { ProvinceService } from '@services/province.service';
import { ProvinceModalComponent } from './province-modal/province-modal.component';

@Component({
    selector: 'app-province',
    templateUrl: './province.component.html',
    styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit {
    bsModalRef?: BsModalRef;

    loading: boolean = false;
    provinces: any = [];
    filters: any = {};
    url: String = _.BASE_URL;

    pagination: any = {
        page: 1,
        count: 0,
        tableSize: 10
    };
    tableSizes = [10, 20, 30, 40, 50, 100, 300, 500, 1000];

    constructor(
        private formBuilder: FormBuilder,
        private provinceService: ProvinceService,
        private modalService: BsModalService
    ) {

    }

    ngOnInit(): void {
        this.filters = {
            keyword: '',
            archived: false,
            skip: 0,
            take: this.pagination.tableSize
        };

        this.fetch();
    }

    fetch() {
        this.filters.skip = (this.pagination.page * this.pagination.tableSize) - this.pagination.tableSize;
        this.filters.take = this.pagination.tableSize;

        this.provinceService
            .fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    this.provinces = data.data;
                    this.pagination.count = data.total;
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

    delete(data) {
        Swal.fire({
            title: '<strong>Are you sure you want to delete ' + data.name + '?</strong>',
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
                    .delete(data)
                    .subscribe({
                        next: (data: any) => {
                            this.provinces = this.provinces.filter(province => province.province_code != data.province_code);
                            Swal.fire('Saved!', '', 'success')
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

    search() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }

    openModal(province: any) {
        const title = province ? 'Edit ' + province.name : 'Add a province';

        const initialState: ModalOptions = {
            class: 'modal-lg',
            initialState: {
                title: title,
                province: province,
            }
        };
        this.bsModalRef = this.modalService.show(ProvinceModalComponent, initialState);
        this.bsModalRef.content.saveBtnName = 'Save';
        this.bsModalRef.content.closeBtnName = 'Close';

        this.bsModalRef.content.callback.subscribe(res => {
            const data = res.data.data;
            this.fetch();
        });
    }

    onTableDataChange(event: any) {
        this.pagination.page = event;
        this.fetch();
    }

    onTableSizeChange(event: any): void {
        this.pagination.tableSize = event.target.value;
        this.pagination.page = 1;
        this.fetch();
    }
}
