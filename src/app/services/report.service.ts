import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(
        public http: HttpClient,
    ) { }

    totalOrders() {
        return this.http.get(`${_.BASE_URL}/report/total_orders`);
    }

    closedOrders() {
        return this.http.get(`${_.BASE_URL}/report/closed_orders`);
    }

    cancelledOrders() {
        return this.http.get(`${_.BASE_URL}/report/cancelled_orders`);
    }

    fetchOrders(filters: any) {
        return this.http.get(`${_.BASE_URL}/report/orders`, { params: filters });
    }
}
