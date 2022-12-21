import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    constructor(
        public http: HttpClient,
    ) { }

    save(message: any) {
        return this.http.post(`${_.BASE_URL}/feedbacks`, message);
    }

    updateStatus(object: any) {
        return this.http.post(`${_.BASE_URL}/feedbacks/${object.pk}/update`, { status: object.status });
    }

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/feedbacks`, { params: filters });
    }

    delete(data: any) {
        return this.http.delete(`${_.BASE_URL}/feedbacks/${data.pk}`, data);
    }
}
