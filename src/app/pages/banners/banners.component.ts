import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DateTime } from 'luxon';
import * as _ from '../../utilities/globals';
import Swal from 'sweetalert2';

import { BannerService } from '@services/banner.service';
import { BannersModalComponent } from './banners-modal/banners-modal.component';

@Component({
    selector: 'app-banners',
    templateUrl: './banners.component.html',
    styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
    bsModalRef?: BsModalRef;

    loading: boolean = false;
    banners: any = [];
    filters: any = {};
    url: String = _.BASE_URL;

    pagination: any = {
        page: 1,
        count: 0,
        tableSize: 5
    };
    tableSizes = [5, 10, 20, 30, 40, 50, 100, 300, 500, 1000];

    constructor(
        private formBuilder: FormBuilder,
        private bannerService: BannerService,
        private modalService: BsModalService
    ) { }

    ngOnInit(): void {
        this.filters = {
            keyword: '',
            skip: 0,
            take: this.pagination.tableSize
        };

        this.fetch();
    }

    fetch() {
        this.filters.skip = (this.pagination.page * this.pagination.tableSize) - this.pagination.tableSize;
        this.filters.take = this.pagination.tableSize;

        this.bannerService
            .fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    this.banners = data.data;
                    console.log(this.banners);
                    this.banners.forEach(banner => {
                        banner.date_formatted = DateTime.fromISO(banner.date_created).toFormat('LLLL dd, yyyy hh:mm:ss a');
                        let icon = {};
                        let background = {};
                        banner.slider_document.forEach(slider => {
                            if (slider.type == 'icon') {
                                icon = slider;
                            }
                            else if (slider.type == 'background') {
                                background = slider;
                            }
                        });

                        banner['icon'] = icon;
                        banner['background'] = background;
                    });

                    console.log(this.banners);

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

    openModal(banner: any) {
        const title = banner ? 'Edit ' + banner.title : 'Add banner';

        const initialState: ModalOptions = {
            class: 'modal-lg',
            initialState: {
                title: title,
                banner: banner,
            }
        };
        this.bsModalRef = this.modalService.show(BannersModalComponent, initialState);
        this.bsModalRef.content.saveBtnName = 'Save';
        this.bsModalRef.content.closeBtnName = 'Close';
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

    delete(i: any) {
        const banner = this.banners[i];
        Swal.fire({
            icon: 'question',
            title: 'Are you sure your want to delete ' + banner.title + '?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            confirmButtonColor: '#dc3545',
            denyButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.bannerService
                    .delete(banner)
                    .subscribe({
                        next: (data: any) => {
                            Swal.fire(banner.title + ' has been successfully deleted!', '', 'success');
                            this.banners.splice(i, 1);
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
