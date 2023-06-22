import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import * as _ from '../../../../utilities/globals';
import { OnboardingService } from '@services/onboarding.service';
import { FileUploaderComponent } from '@components/file-uploader/file-uploader.component';

@Component({
    selector: 'app-onboarding-modal',
    templateUrl: './onboarding-modal.component.html',
    styleUrls: ['./onboarding-modal.component.scss']
})
export class OnboardingModalComponent implements OnInit {
    public callback: EventEmitter<any> = new EventEmitter();
    loading: boolean = false;
    title?: string;
    saveBtnName?: string;
    closeBtnName?: string;

    type: any = ['home'];
    onboarding: any = {};
    filters: any = {};

    url: String = _.BASE_URL;
    image: any = {};

    submitted: boolean = false;
    form: FormGroup;

    constructor(
        public bsModalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private onboardingService: OnboardingService,
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

        this.setForm();
    }

    setForm() {
        this.image = this.onboarding ? this.onboarding.onboarding_document : {};
        // this.banner.slider_document.forEach(slider => { 
        //     if (slider.type == 'icon') {

        //     }
        // });

        this.form = this.formBuilder.group({
            pk: [''],
            title: [this.onboarding ? this.onboarding.title : '', Validators.required],
            description: [this.onboarding ? this.onboarding.description : '', Validators.required],
            image: [''],
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

        this.form.get('pk').patchValue(this.onboarding ? this.onboarding.pk : null);
        this.onboardingService
            .save(this.form.value)
            .subscribe({
                next: (data: any) => {
                    this.callback.emit({ data });
                    this.toastr.success('The news has been successfully updated', 'SUCCESS!');
                },
                error: (error: any) => {
                    console.log(error);
                    this.toastr.error('An error occurred while updating the user. Please try again', 'ERROR!');
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => {
                        this.loading = false;
                        this.bsModalRef.hide();
                    }, 500);
                }
            });
    }

    uploadFiles() {
        const initialState: ModalOptions = {
            class: 'modal-lg'
        };
        this.documentUploaderRef = this.modalService.show(FileUploaderComponent, initialState);

        this.documentUploaderRef.content.document.subscribe(res => {
            // console.log('file', res.file);

            this.image.document = res.file;
            this.form.get('image').patchValue(this.image);

            this.cdr.detectChanges();
        });
    }

}
