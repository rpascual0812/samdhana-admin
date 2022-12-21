import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(
        public http: HttpClient,
    ) { }

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/cities`, { params: { province_code: filters.province_code } });
    }

    fetch(data: any) {
        return this.http.get(`${_.BASE_URL}/cities`);
    }
}
