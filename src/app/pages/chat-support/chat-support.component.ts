import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import * as _ from '../../utilities/globals';
import Swal from 'sweetalert2';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ChatService } from '@services/chat.service';
import { UserService } from '@services/user.service';
import * as Ably from 'ably';

@Component({
    selector: 'app-chat-support',
    templateUrl: './chat-support.component.html',
    styleUrls: ['./chat-support.component.scss']
})
export class ChatSupportComponent implements OnInit {
    @ViewChild('scrollable') private myScrollContainer: ElementRef;
    @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
    bsModalRef?: BsModalRef;

    realtime: any;
    channel: any;

    loading: boolean = false;
    users: any = [];
    filters: any = {};
    url: string = _.BASE_URL;
    status: string = 'Open';

    user: any = {};
    activeChat: any = {};
    messages: any = [];
    message: any = '';

    pagination: any = {
        page: 1,
        count: 0,
        tableSize: 5
    };
    tableSizes = [5, 10, 20, 30, 40, 50, 100, 300, 500, 1000];

    loadingMessages: any = false;
    messagesPagination: any = {
        skip: 0,
        take: 10
    }

    concern = 'product';

    constructor(
        private formBuilder: FormBuilder,
        private chatService: ChatService,
        private userService: UserService,
        private modalService: BsModalService,
        private router: Router,
        private readonly changeDetector: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.filters = {
            keyword: '',
            skip: 0,
            take: this.pagination.tableSize
        };

        this.profile();
        this.fetch();

    }

    // @HostListener('window:scroll', [])
    // onWindowScroll() {
    //     console.log('onwindowscroll');
    //     const element = this.myScrollContainer.nativeElement;
    //     const viewportOffset = element.getBoundingClientRect();
    //     const top = viewportOffset.top;
    //     if (top <= 0) {
    //         console.log('now on top');
    //     }
    // }

    selectTab(tabId: number) {
        if (this.staticTabs?.tabs[tabId]) {
            this.staticTabs.tabs[tabId].active = true;
        }
    }

    profile() {
        this.userService
            .fetch()
            .subscribe({
                next: (data: any) => {
                    this.user = data;
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

    fetch() {
        this.activeChat = {};

        this.users = [];
        this.filters.type = 'support';
        this.filters.role = 'admin';
        // console.log('chat support', this.filters);
        this.chatService
            .fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    this.users = data.data;
                    this.users.forEach(user => {
                        user.active = false;
                        user.date_formatted = DateTime.fromISO(user.last_message_date).toFormat('LLLL dd, yyyy hh:mm:ss a');
                    });
                    this.pagination.count = data.total;
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

    onTableDataChange(event: any) {
        this.pagination.page = event;
        this.fetch();
    }

    onTableSizeChange(event: any): void {
        this.pagination.tableSize = event.target.value;
        this.pagination.page = 1;
        this.fetch();
    }

    setActiveChat(user: any) {
        this.users.forEach(user_ => {
            user.active = false;
            if (user.pk == user_.pk) {
                user.active = true;
            }
        });

        this.activeChat = user;
        this.initAbly();

        this.messages = [];
        this.messagesPagination = {
            skip: 0,
            take: 10
        }
        this.fetchMessages(() => {
            this.scroll();
        });
        // setTimeout(() => {
        //     this.scroll();
        // }, 1000);
    }

    fetchMessages(callback: any) {

        const filters = {
            chat_pk: this.activeChat.pk,
            skip: this.messagesPagination.skip,
            take: this.messagesPagination.take
        };

        this.chatService
            .fetchMessages(filters)
            .subscribe({
                next: (data: any) => {
                    // this.messages = data.data;
                    data.data.forEach(message => {
                        message.date_formatted = DateTime.fromISO(message.date_created).toFormat('LLLL dd, yyyy hh:mm:ss a');
                    });

                    this.messages.unshift(...data.data);
                    console.log('messages', this.messages);
                    // setTimeout(() => {
                    //     this.loadingMessages = false;
                    //     this.messages.unshift(...data.data);
                    // }, 1000);
                    callback();
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

    send() {
        var body = {
            'uuid': this.activeChat.uuid,
            'message': this.message,
            'user_pk': this.user.pk,
        };

        if (this.message != '') {
            this.chatService
                .send(body)
                .subscribe({
                    next: async (data: any) => {
                        this.message = '';
                        data.data.date_formatted = DateTime.fromISO(data.data.date_created).toFormat('LLLL dd, yyyy hh:mm:ss a');
                        // this.messages.push(data.data);
                        this.scroll();
                        this.playSent();
                        // console.log(this.message, data);
                        this.publishMessage(data);

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
    }

    scroll() {
        setTimeout(() => {
            try {
                this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
            } catch (err) { }
            // console.log('scrolled');
        }, 100);
    }

    onScroll(e: any) {
        if (this.myScrollContainer.nativeElement.scrollTop <= 0) {
            this.messagesPagination.skip += this.messagesPagination.take;

            this.loadingMessages = true;
            setTimeout(() => {
                this.fetchMessages(() => { });
                this.loadingMessages = false;
            }, 500);
        }
    }

    async initAbly() {
        this.realtime = new Ably.Realtime.Promise('doWdpw.N7ThxA:oZEbqOjgtiGu_9xXAPMGgaIjahml6kKvzBCEgZqziW8');
        await this.realtime.connection.once("connected");

        this.channel = this.realtime.channels.get(this.activeChat.uuid);
        await this.channel.subscribe((msg) => {
            const data = msg.data;
            // console.log('initAbly', data);
            this.fetchMessage(data['uuid'], data['pk']);
            this.playReceived();
        });

        // let client = new Ably.Realtime({ key: 'doWdpw.N7ThxA:oZEbqOjgtiGu_9xXAPMGgaIjahml6kKvzBCEgZqziW8' });
        // let channel = client.channels.get('user-' + this.activeChat.chat_participant.user.pk);
        // channel.subscribe(this.activeChat.uuid, message => {
        //     console.log(message);

        //     this.changeDetector.detectChanges();
        // })
    }

    async publishMessage(data) {
        const realtime = new Ably.Realtime.Promise('doWdpw.N7ThxA:oZEbqOjgtiGu_9xXAPMGgaIjahml6kKvzBCEgZqziW8');
        await realtime.connection.once("connected");
        // console.log('publish message', this.activeChat.uuid);
        const channel = realtime.channels.get(this.activeChat.uuid);
        // await this.realtime.connection.once("connected");
        await channel.publish(this.activeChat.uuid, data.data);
    }

    fetchMessage(uuid: any, pk: any) {
        const filters = {
            uuid: uuid,
            pk: pk,
        };

        this.chatService
            .fetchMessage(filters)
            .subscribe({
                next: (data: any) => {
                    console.log(data);
                    this.messages.push(data);
                    this.scroll();
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

    playSent() {
        let audio = new Audio();
        audio.src = "../../../assets/sounds/sent.mp3";
        audio.load();
        audio.play();
    }

    playReceived() {
        let audio = new Audio();
        audio.src = "../../../assets/sounds/received.mp3";
        audio.load();
        audio.play();
    }
}
