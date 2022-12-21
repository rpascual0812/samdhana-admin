import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class FaqService {

    constructor(
        public http: HttpClient,
    ) { }

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/faq`, { params: filters });
    }

    fetch(data: any) {
        return this.http.get(`${_.BASE_URL}/faq`);
    }

    save(faq: any) {
        return this.http.post(`${_.BASE_URL}/faq`, faq);
    }

    update(pk: any, faq: any) {
        return this.http.post(`${_.BASE_URL}/faq/update`, { pk, faq });
    }
}
