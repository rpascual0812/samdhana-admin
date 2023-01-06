import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        public http: HttpClient,
    ) { }

    fetch() {
        return this.http.get(`${_.BASE_URL}/products/profile`);
    }

    save(user: any) {
        return this.http.post(`${_.BASE_URL}/products/update`, user);
    }

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/products`, { params: filters });
    }
}
