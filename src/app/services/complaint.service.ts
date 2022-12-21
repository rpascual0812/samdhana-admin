import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class ComplaintService {

    constructor(
        public http: HttpClient,
    ) { }

    save(message: any) {
        return this.http.post(`${_.BASE_URL}/complaints`, message);
    }

    send(object: any) {
        return this.http.post(`${_.BASE_URL}/complaints/${object.pk}/messages`, { message: object.message });
    }

    updateStatus(object: any) {
        return this.http.post(`${_.BASE_URL}/complaints/${object.pk}/update`, { status: object.status });
    }

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/complaints`, { params: filters });
    }

    fetchMessages(pk: any) {
        return this.http.get(`${_.BASE_URL}/complaints/${pk}/messages`);
    }

    uploadPhoto(object: any) {
        return this.http.post(`${_.BASE_URL}/complaints/photo`, object);
    }

    delete(data: any) {
        return this.http.delete(`${_.BASE_URL}/complaints/${data.pk}`, data);
    }
}
