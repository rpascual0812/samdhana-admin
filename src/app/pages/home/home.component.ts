import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { ReportService } from '@services/report.service';
import * as _ from '../../utilities/globals';
import { DateTime } from 'luxon';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    type = 'doughnut';
    options = {
        responsive: true,
        maintainAspectRatio: true
    };

    categories = {
        labels: [
            'Fruits',
            'Livestocks',
            'Native Handmade',
            'Root Crops',
            'Vegetables'
        ],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100, 68, 234],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(52, 235, 131)',
                    'rgb(201, 52, 235)',
                ],
                hoverOffset: 4
            }
        ]
    };

    statuses = {
        labels: [
            'Total',
            'Closed',
            'Cancelled'
        ],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }
        ]
    };

    loading: boolean = false;
    orders: any = [];
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
        private reportService: ReportService
    ) {

    }

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

        this.reportService
            .fetchOrders(this.filters)
            .subscribe({
                next: (data: any) => {
                    this.orders = data.data;

                    this.orders.forEach(order => {
                        order.date_formatted = DateTime.fromISO(order.date_created).toFormat('LLLL dd, yyyy hh:mm:ss a');
                    });

                    console.log(this.orders);
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
