import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class OnboardingService {

    constructor(
        public http: HttpClient,
    ) { }

    save(banner: any) {
        return this.http.post(`${_.BASE_URL}/onboardings`, banner);
    }

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/onboardings`, { params: filters });
    }

    uploadPhoto(object: any) {
        return this.http.post(`${_.BASE_URL}/onboardings/photo`, object);
    }

    delete(data: any) {
        return this.http.delete(`${_.BASE_URL}/onboardings/${data.pk}`, data);
    }
}
