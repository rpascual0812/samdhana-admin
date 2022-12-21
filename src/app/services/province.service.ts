import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class ProvinceService {

    constructor(
        public http: HttpClient,
    ) { }

    fetchAll(pagination: any) {
        return this.http.get(`${_.BASE_URL}/provinces`);
    }

    fetch(data: any) {
        return this.http.get(`${_.BASE_URL}/provinces`);
    }
}
