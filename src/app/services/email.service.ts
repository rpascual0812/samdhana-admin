import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    constructor(
        public http: HttpClient,
    ) { }

    async checkEmail(email: any): Promise<any> {
        return this.http.post(`${_.BASE_URL}/emails/check`, { email: email }).toPromise();
    }

    async verifyEmail(email: any): Promise<any> {
        return this.http.post(`${_.BASE_URL}/emails/validate`, { email: email }).toPromise();
        // return this.http.get("https://emailvalidation.abstractapi.com/v1/?api_key=46f927fabc5c4596b4c38ffc27285078&email=" + email).toPromise();
    }
}
