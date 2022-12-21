import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    constructor(
        public http: HttpClient,
    ) { }

    async fetchAll(pagination: any): Promise<any> {
        return this.http.get(`${_.BASE_URL}/documents`, { params: pagination }).toPromise();
    }

    async fetch(data: any): Promise<any> {
        return this.http.get(`${_.BASE_URL}/documents`).toPromise();
    }
}
