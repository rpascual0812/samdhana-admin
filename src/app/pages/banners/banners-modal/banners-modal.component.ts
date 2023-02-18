import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { BannerService } from '@services/banner.service';

import * as _ from '../../../utilities/globals';
import { FileUploaderComponent } from '@components/file-uploader/file-uploader.component';

@Component({
    selector: 'app-banners-modal',
    templateUrl: './banners-modal.component.html',
    styleUrls: ['./banners-modal.component.scss']
})
export class BannersModalComponent implements OnInit {
    public callback: EventEmitter<any> = new EventEmitter();
    loading: boolean = false;
    title?: string;
    saveBtnName?: string;
    closeBtnName?: string;

    type: any = ['home'];
    banner: any = {};
    filters: any = {};

    url: String = _.BASE_URL;
    icon: any = {};
    background: any = {};

    submitted: boolean = false;
    form: FormGroup;

    constructor(
        public bsModalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private bannerService: BannerService,
        private toastr: ToastrService,
        public documentUploaderRef: BsModalRef,
        private modalService: BsModalService,
        private cdr: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.filters = {
            search: '',
            skip: 0,
            take: 10
        };

        // this.icon = this.url + '/' + 'assets/images/user_.png';
        // this.background = this.url + '/' + 'assets/images/no-image.jpg';

        this.setForm();
    }

    setForm() {
        this.icon = this.banner ? this.banner.icon : {};
        this.background = this.banner ? this.banner.background : {};
        // this.banner.slider_document.forEach(slider => { 
        //     if (slider.type == 'icon') {

        //     }
        // });

        this.form = this.formBuilder.group({
            pk: [''],
            title: [this.banner ? this.banner.title : '', Validators.required],
            details: [this.banner ? this.banner.details : '', Validators.required],
            icon: [''],
            background: [''],
        });
    }

    get f() { return this.form.controls; }

    submit() {
        this.loading = true;
        // console.log('submitting');
        this.submitted = true;
        // console.log(this.form.invalid);
        // console.log(this.form.value);
        if (this.form.invalid) {
            return;
        }

        this.form.get('pk').patchValue(this.banner ? this.banner.pk : null);
        this.bannerService
            .save(this.form.value)
            .subscribe({
                next: (data: any) => {
                    this.callback.emit({ data });
                    this.toastr.success('The user has been successfully updated', 'SUCCESS!');
                },
                error: (error: any) => {
                    console.log(error);
                    this.toastr.error('An error occurred while updating the user. Please try again', 'ERROR!');
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                }
            });
    }

    uploadFiles(type: any) {
        // console.log('icon', this.icon);
        // console.log('background', this.background);
        const initialState: ModalOptions = {
            class: 'modal-lg'
        };
        this.documentUploaderRef = this.modalService.show(FileUploaderComponent, initialState);

        this.documentUploaderRef.content.document.subscribe(res => {
            // console.log('file', res.file);

            if (type == 'icon') {
                this.icon.document = res.file;
                this.form.get('icon').patchValue(this.icon);
            }
            else if (type == 'background') {
                this.background.document = res.file;
                this.form.get('background').patchValue(this.background);
            }

            this.cdr.detectChanges();
        });
    }

}
