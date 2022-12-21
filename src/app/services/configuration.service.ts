import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    constructor(
        public http: HttpClient,
    ) { }

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/configuration`, { params: filters });
    }

    fetch(data: any) {
        return this.http.get(`${_.BASE_URL}/configuration`);
    }

    save(configuration: any) {
        return this.http.post(`${_.BASE_URL}/configuration`, configuration);
    }
}
