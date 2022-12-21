import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class SupportService {

    constructor(
        public http: HttpClient,
    ) { }

    async save(data: any): Promise<any> {
        const url = `${_.BASE_URL}/tickets`;
        return this.http.post(url, data).toPromise();
    }

    async fetchAll(pagination: any): Promise<any> {
        return this.http.get(`${_.BASE_URL}/tickets`, { params: pagination }).toPromise();
    }
}
