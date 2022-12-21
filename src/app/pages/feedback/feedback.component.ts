import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DateTime } from 'luxon';
import * as _ from '../../utilities/globals';
import Swal from 'sweetalert2';
import { FeedbackService } from '@services/feedback.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
    bsModalRef?: BsModalRef;

    loading: boolean = false;
    feedbacks: any = [];
    filters: any = {};
    url: string = _.BASE_URL;
    status: string = 'Open';

    pagination: any = {
        page: 1,
        count: 0,
        tableSize: 8
    };
    tableSizes = [5, 10, 20, 30, 40, 50, 100, 300, 500, 1000];

    constructor(
        private formBuilder: FormBuilder,
        private feedbackService: FeedbackService,
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
        this.filters.status = this.status;
        this.filters.skip = (this.pagination.page * this.pagination.tableSize) - this.pagination.tableSize;
        this.filters.take = this.pagination.tableSize;

        this.feedbackService
            .fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    data.data.forEach(data => {
                        data.date_formatted = DateTime.fromISO(data.date_created).toFormat('LLLL dd, yyyy hh:mm:ss a');

                        this.feedbacks.push(data);
                    });
                    console.log('feedback', this.feedbacks);
                    // this.feedbacks = data.data;
                    this.pagination.count = data.total;
                    console.log('pagination', this.pagination);
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

    loadMore() {
        this.pagination.page++;
        this.fetch();
    }

}
