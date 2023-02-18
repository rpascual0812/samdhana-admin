import { Component, OnInit, ChangeDetectorRef, EventEmitter, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DateTime } from 'luxon';
import * as Ably from 'ably';

import * as _ from '../../../utilities/globals';

import { TexteditorComponent } from '@components/texteditor/texteditor.component';
import { ComplaintService } from '@services/complaint.service';

declare var tinymce: any;

@Component({
    selector: 'app-complaints-modal',
    templateUrl: './complaints-modal.component.html',
    styleUrls: ['./complaints-modal.component.scss']
})
export class ComplaintsModalComponent implements OnInit {
    public callback: EventEmitter<any> = new EventEmitter();
    @ViewChild('message') messageEditor: TexteditorComponent;
    @ViewChildren('messageList') messageList: QueryList<any>;
    @ViewChild('content') content: ElementRef;

    realtime: any;
    channel: any;

    loading: boolean = false;
    title?: string;
    saveBtnName?: string;
    closeBtnName?: string;

    complaint: any = {};
    filters: any = {};
    messages: any = [];
    newMessage: any = '';

    submitted: boolean = false;

    url: String = _.BASE_URL;

    constructor(
        public bsModalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        public documentUploaderRef: BsModalRef,
        private modalService: BsModalService,
        private cdr: ChangeDetectorRef,
        private complaintService: ComplaintService
    ) { }

    ngOnInit(): void {
        this.initAbly();

        tinymce.init(
            {
                height: "480",
                selector: "#message",
            }
        );

        this.filters = {
            search: '',
            skip: 0,
            take: 10
        };

        this.fetch();
    }

    ngAfterViewInit() {
        this.scrollToBottom();
        this.messageList.changes.subscribe(this.scrollToBottom);
    }

    scrollToBottom = () => {
        try {
            this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
        } catch (err) { }
    }

    async initAbly() {
        console.log('init ably');
        console.log('complaint-' + this.complaint.pk);
        this.realtime = new Ably.Realtime.Promise('doWdpw.N7ThxA:oZEbqOjgtiGu_9xXAPMGgaIjahml6kKvzBCEgZqziW8');
        await this.realtime.connection.once("connected");

        this.channel = this.realtime.channels.get('complaint-' + this.complaint.pk);
        await this.channel.subscribe((msg) => {
            const data = msg.data;
            console.log('complaint received ', data);
            this.fetchMessage(data);
            // this.fetch();
        });

        // let client = new Ably.Realtime({ key: 'doWdpw.N7ThxA:oZEbqOjgtiGu_9xXAPMGgaIjahml6kKvzBCEgZqziW8' });
        // let channel = client.channels.get('user-' + this.activeChat.chat_participant.user.pk);
        // channel.subscribe(this.activeChat.uuid, message => {
        //     console.log(message);

        //     this.changeDetector.detectChanges();
        // })
    }

    fetch() {
        this.complaintService
            .fetchMessages(this.complaint.pk)
            .subscribe({
                next: (data: any) => {
                    this.messages = data.data;
                    this.messages.forEach(message => {
                        message.date_formatted = DateTime.fromISO(message.date_created).toFormat('LLLL dd, yyyy hh:mm:ss a');
                    });
                    console.log(this.messages);
                },
                error: (error: any) => {
                    console.log(error);
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                }
            });
    }

    fetchMessage(data: any) {
        this.complaintService
            .fetchMessage(this.complaint.pk, data.pk)
            .subscribe({
                next: (data: any) => {
                    this.messages.push(data);
                },
                error: (error: any) => {
                    console.log(error);
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                }
            });
    }

    submit() {
        this.loading = true;
        this.submitted = true;

        const message = this.messageEditor.returnMessage();

        this.complaintService
            .send({ pk: this.complaint.pk, message: message })
            .subscribe({
                next: (data: any) => {
                    this.toastr.success('Message sent', 'SUCCESS!');
                    this.messageEditor.reset();
                    this.publishMessage(data);
                    this.fetch();
                },
                error: (error: any) => {
                    console.log(error);
                    this.toastr.error('An error occurred while updating the complaint. Please try again', 'ERROR!');
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                }
            });
    }

    async publishMessage(data) {
        const realtime = new Ably.Realtime.Promise('doWdpw.N7ThxA:oZEbqOjgtiGu_9xXAPMGgaIjahml6kKvzBCEgZqziW8');
        await realtime.connection.once("connected");
        // console.log('publish message', this.activeChat.uuid);
        const channel = realtime.channels.get('complaint-' + this.complaint.pk);
        // await this.realtime.connection.once("connected");
        await channel.publish('complaint-' + this.complaint.pk, data.data);
    }

    updateStatus(status) {
        this.complaintService
            .updateStatus({ pk: this.complaint.pk, status: status })
            .subscribe({
                next: (data: any) => {
                    this.complaint.status = status;
                    this.toastr.success(this.complaint.subject + ' has been marked as ' + (status == 'Closed' ? 'Solved' : 'Open'), 'SUCCESS!');
                },
                error: (error: any) => {
                    console.log(error);
                    this.toastr.error('An error occurred while updating the complaint. Please try again', 'ERROR!');
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                }
            });
    }

}
