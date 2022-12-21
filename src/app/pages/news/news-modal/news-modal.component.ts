import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import * as _ from '../../../utilities/globals';
import { FileUploaderComponent } from '@components/file-uploader/file-uploader.component';
import { NewsService } from '@services/news.service';

@Component({
    selector: 'app-news-modal',
    templateUrl: './news-modal.component.html',
    styleUrls: ['./news-modal.component.scss']
})
export class NewsModalComponent implements OnInit {
    loading: boolean = false;
    title?: string;
    saveBtnName?: string;
    closeBtnName?: string;

    type: any = ['home'];
    article: any = {};
    filters: any = {};

    url: String = _.BASE_URL;
    image: any = {};

    submitted: boolean = false;
    form: FormGroup;

    constructor(
        public bsModalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private newsService: NewsService,
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
        console.log('article', this.article);
        this.image = this.article ? this.article.article_document : {};
        // this.banner.slider_document.forEach(slider => { 
        //     if (slider.type == 'icon') {

        //     }
        // });

        this.form = this.formBuilder.group({
            pk: [''],
            title: [this.article ? this.article.title : '', Validators.required],
            description: [this.article ? this.article.description : '', Validators.required],
            url: [this.article ? this.article.url : '', Validators.required],
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

        this.form.get('pk').patchValue(this.article ? this.article.pk : null);
        this.newsService
            .save(this.form.value)
            .subscribe({
                next: (data: any) => {
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

    uploadFiles() {
        // console.log('icon', this.icon);
        // console.log('background', this.background);
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
