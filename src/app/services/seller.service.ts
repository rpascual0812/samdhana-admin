import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class SellerService {

    constructor(
        public http: HttpClient,
    ) { }

    fetch(pk: number) {
        return this.http.get(`${_.BASE_URL}/sellers/${pk}`);
    }

    save(user: any) {
        return this.http.post(`${_.BASE_URL}/sellers/update`, user);
    }

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/sellers`, { params: filters });
    }

    uploadPhoto(object: any) {
        return this.http.post(`${_.BASE_URL}/sellers/photo`, object);
    }
}
