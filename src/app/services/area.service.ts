import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class AreaService {

    constructor(
        public http: HttpClient,
    ) { }

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/areas`, { params: { city_code: filters.city_code } });
    }

    fetch(data: any) {
        return this.http.get(`${_.BASE_URL}/areas`);
    }
}
