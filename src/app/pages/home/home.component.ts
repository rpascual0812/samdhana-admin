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

    categories = {};
    statuses = {};
    ordersByCategories = [];

    total = {
        orders: 0,
        closed: 0,
        cancelled: 0
    }

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

        this.ordersByCategory();
        this.countOrders('total');
        this.countOrders('closed');
        this.countOrders('cancelled');
        this.fetch();
    }

    countOrders(type: any) {
        this.reportService
            .countOrders({ type })
            .subscribe({
                next: (data: any) => {
                    console.log(type, data);
                    switch (type) {
                        case 'closed':
                            this.total.closed = data.total;
                            break;
                        case 'cancelled':
                            this.total.cancelled = data.total;
                            break;
                        default:
                            this.total.orders = data.total;
                            break;
                    }

                    this.setStatusesChart();
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

    ordersByCategory() {
        this.reportService
            .ordersByCategory()
            .subscribe({
                next: (data: any) => {
                    console.log('categories chart', data);
                    this.ordersByCategories = data;
                    this.setCategoriesChart();
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

    setCategoriesChart() {
        let labels = [],
            data = [];

        this.ordersByCategories.forEach(order => {
            labels.push(order.name);
            data.push(order.category_pk);
        });

        this.categories = {
            labels: labels,
            datasets: [
                {
                    label: 'My First Dataset',
                    data: data,
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
    }

    setStatusesChart() {
        this.statuses = {
            labels: [
                'Total',
                'Closed',
                'Cancelled'
            ],
            datasets: [
                {
                    label: 'My First Dataset',
                    data: [this.total.orders, this.total.closed, this.total.cancelled],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(255,0,0)',
                        'rgb(255,140,0)',
                        'rgb(154,205,50)',
                        'rgb(0,128,0)',
                        'rgb(127,255,212)',
                        'rgb(0,0,205)',
                        'rgb(186,85,211)',
                    ],
                    hoverOffset: 4
                }
            ]
        };
    }

}
