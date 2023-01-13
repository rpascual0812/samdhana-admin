import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from '../utilities/globals';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(
        public http: HttpClient,
    ) { }

    fetchAll(filters: any) {
        return this.http.get(`${_.BASE_URL}/chats`, { params: filters });
    }

    fetchMessage(filters: any) {
        return this.http.get(`${_.BASE_URL}/chats/${filters.uuid}/messages/${filters.pk}`);
    }

    fetchMessages(filters: any) {
        return this.http.get(`${_.BASE_URL}/chats/${filters.chat_pk}/messages`, { params: filters });
    }

    send(data: any) {
        return this.http.post(`${_.BASE_URL}/chats/messages`, data);
    }

    fetch(data: any) {
        return this.http.get(`${_.BASE_URL}/chats`);
    }
}
