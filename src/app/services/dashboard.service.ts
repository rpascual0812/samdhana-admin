import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(
        public http: HttpClient
    ) { }

    test(): Promise<any> {
        const url = `${_.BASE_URL}/test`;
        return this.http.get(url).toPromise();
    }


}
