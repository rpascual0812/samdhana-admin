import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DateTime } from 'luxon';
import * as _ from '../../utilities/globals';
import Swal from 'sweetalert2';
import { ComplaintService } from '@services/complaint.service';
import { ComplaintsModalComponent } from './complaints-modal/complaints-modal.component';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
    selector: 'app-compaints',
    templateUrl: './compaints.component.html',
    styleUrls: ['./compaints.component.scss']
})
export class CompaintsComponent implements OnInit {
    @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
    bsModalRef?: BsModalRef;

    loading: boolean = false;
    complaints: any = [];
    filters: any = {};
    url: string = _.BASE_URL;
    status: string = 'Open';

    pagination: any = {
        page: 1,
        count: 0,
        tableSize: 5
    };
    tableSizes = [5, 10, 20, 30, 40, 50, 100, 300, 500, 1000];

    concern = 'Product Concerns';
    concerns = ['Product Concerns', 'Transaction Concerns'];

    constructor(
        private formBuilder: FormBuilder,
        private complaintService: ComplaintService,
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

    selectTab(tabId: number) {
        if (this.staticTabs?.tabs[tabId]) {
            this.staticTabs.tabs[tabId].active = true;
        }
    }

    fetch() {
        this.filters.type = this.concern;
        this.filters.status = this.status;
        this.filters.skip = (this.pagination.page * this.pagination.tableSize) - this.pagination.tableSize;
        this.filters.take = this.pagination.tableSize;

        this.complaintService
            .fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    this.complaints = data.data;
                    this.complaints.forEach(complaint => {
                        complaint.date_formatted = DateTime.fromISO(complaint.date_created).toFormat('LLLL dd, yyyy hh:mm:ss a');
                        let icon = {};
                        let background = {};
                    });
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

    openModal(complaint: any) {
        const title = complaint ? 'Edit ' + complaint.subject : 'Add news & updates';

        const initialState: ModalOptions = {
            class: 'modal-lg',
            initialState: {
                title,
                complaint,
            }
        };
        this.bsModalRef = this.modalService.show(ComplaintsModalComponent, initialState);
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

    resolve(complaint: any) {
        console.log(complaint);
    }

}
