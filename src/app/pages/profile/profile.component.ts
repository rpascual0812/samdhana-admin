import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '@services/user.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { PhotoEditorComponent } from '@components/photo-editor/photo-editor.component';

import * as _ from '../../utilities/globals';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: any;
    bsModalRef?: BsModalRef;
    url: string = (!_.PRODUCTION ? _.BASE_URL : '');

    constructor(
        private modalService: BsModalService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.fetch();
    }

    fetch() {
        // this.userService.fetch()
        //     .then((data: any) => {
        //         // console.log(data);
        //         this.user = data;
        //     })
        //     .catch((err: any) => {
        //         Swal.fire('Failed', 'An error occurred! Please try again.', 'error');
        //     });
    }

    editPhoto() {
        const initialState: ModalOptions = {
            class: 'modal-lg',
            initialState: {}
        };

        this.bsModalRef = this.modalService.show(PhotoEditorComponent, initialState);

        this.bsModalRef.content.image.subscribe(res => {
            this.user.photo = res.data.path;
            // console.log('returned photo', res.data);
            // console.log('user', this.user);
        });
    }
}
