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

    fetchOrders(filters: any) {
        return this.http.get(`${_.BASE_URL}/report/orders`, { params: filters });
    }
}
