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

    countOrders(filters: any) {
        return this.http.get(`${_.BASE_URL}/report/count_orders`, { params: filters });
    }

    fetchOrders(filters: any) {
        return this.http.get(`${_.BASE_URL}/report/orders`, { params: filters });
    }

    ordersByCategory() {
        return this.http.get(`${_.BASE_URL}/report/count_orders_by_category`);
    }
}
