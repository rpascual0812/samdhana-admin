import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as _ from '../../utilities/globals';

import { UsersModalComponent } from './users-modal/users-modal.component';
import { UserService } from '@services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    bsModalRef?: BsModalRef;

    loading: boolean = false;
    users: any = [];
    filters: any = {};
    url: String = _.BASE_URL;

    pagination: any = {
        page: 1,
        count: 0,
        tableSize: 10
    };
    tableSizes = [10, 20, 30, 40, 50, 100, 300, 500, 1000];

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private modalService: BsModalService
    ) {

    }

    ngOnInit(): void {
        this.filters = {
            keyword: '',
            skip: 0,
            take: this.pagination.tableSize
        };

        this.fetch();
    }

    fetch() {
        this.filters.skip = (this.pagination.page * this.pagination.tableSize) - this.pagination.tableSize;
        this.filters.take = this.pagination.tableSize;

        this.userService
            .fetchAll(this.filters)
            .subscribe({
                next: (data: any) => {
                    this.users = data.data;
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

    search() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }

    openModal(user: any) {
        const title = user ? 'Edit ' + user.first_name : 'Add user';

        const initialState: ModalOptions = {
            class: 'modal-lg',
            initialState: {
                title: title,
                user: user,
            }
        };
        this.bsModalRef = this.modalService.show(UsersModalComponent, initialState);
        this.bsModalRef.content.saveBtnName = 'Save';
        this.bsModalRef.content.closeBtnName = 'Close';

        this.bsModalRef.content.callback.subscribe(res => {
            const data = res.data.data;
            this.fetch();
            // this.users.forEach(user => {
            //     if (user.pk == data.pk) {
            //         user.first_name = data.first_name;
            //         user.last_name = data.last_name;
            //         user.last_name = data.last_name;
            //     }
            // });
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
}
