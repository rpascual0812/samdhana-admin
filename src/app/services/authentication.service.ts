import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        public http: HttpClient,
        private router: Router
    ) { }

    login(data: any): Promise<any> {
        data.role = 'admin';
        const url = `${_.BASE_URL}/login`;
        return this.http.post(url, data).toPromise();
    }

    isLoggedIn() {
        // console.log(localStorage.getItem('o__token'));
        return !!localStorage.getItem('o__token');
    }

    refresh(): Promise<any> {
        const url = `${_.BASE_URL}/refresh`;
        return this.http.get(url).toPromise();
    }

    setSession(res: any) {
        this.unsetSession();
        localStorage.setItem('o__token', res.user.access_token);
    }

    unsetSession() {
        localStorage.removeItem("o__token");
    }

    logout() {
        const url = `${_.BASE_URL}/logout`;
        return this.http.post(url, { token: localStorage.getItem('o__token') });
    }

    forgot(data: any): Promise<any> {
        const url = `${_.BASE_URL}/forgot-password`;
        return this.http.post(url, data).toPromise();
    }

    async reset(data: any): Promise<any> {
        const url = `${_.BASE_URL}/reset-password`;
        return await this.http.post(url, data).toPromise();
    }

    resetToken(token: string): Promise<any> {
        const url = `${_.BASE_URL}/reset-token`;
        return this.http.get(url, { params: { token } }).toPromise();
    }

    register(data: any): Promise<any> {
        const url = `${_.BASE_URL}/register`;
        return this.http.post(url, data).toPromise();
    }
}
