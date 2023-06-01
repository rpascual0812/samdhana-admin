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

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/provinces`, { params: filters });
    }

    fetch(data: any) {
        return this.http.get(`${_.BASE_URL}/provinces`);
    }

    save(province: any) {
        return this.http.post(`${_.BASE_URL}/provinces/update`, province);
    }

    delete(province: any) {
        return this.http.delete(`${_.BASE_URL}/provinces/${province.province_code}`, province);
    }
}
