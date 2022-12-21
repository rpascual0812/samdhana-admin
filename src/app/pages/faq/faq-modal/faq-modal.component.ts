import { Component, OnInit, ChangeDetectorRef, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { FaqService } from '@services/faq.service';
import { TexteditorComponent } from '@components/texteditor/texteditor.component';

@Component({
    selector: 'app-faq-modal',
    templateUrl: './faq-modal.component.html',
    styleUrls: ['./faq-modal.component.scss']
})
export class FaqModalComponent implements OnInit {
    public callback: EventEmitter<any> = new EventEmitter();
    @ViewChild('answer') answerEditor: TexteditorComponent;

    loading: boolean = false;
    title?: string;
    saveBtnName?: string;
    closeBtnName?: string;

    faq: any = {};
    filters: any = {};

    submitted: boolean = false;
    form: FormGroup;

    constructor(
        public bsModalRef: BsModalRef,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        public documentUploaderRef: BsModalRef,
        private modalService: BsModalService,
        private cdr: ChangeDetectorRef,
        private faqService: FaqService
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
        console.log('faq', this.faq);
        this.form = this.formBuilder.group({
            pk: [''],
            question: [this.faq ? this.faq.question : '', Validators.required],
            answer: [this.faq ? this.faq.answer : '', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    submit() {
        this.loading = true;
        // console.log('submitting');
        this.submitted = true;
        console.log(this.form.invalid);
        // console.log(this.form.value);

        // const answer = this.answerEditor.returnMessage();
        // this.form.get('answer').patchValue(answer);

        if (this.form.invalid) {
            return;
        }


        this.form.get('pk').patchValue(this.faq ? this.faq.pk : null);
        this.faqService
            .save(this.form.value)
            .subscribe({
                next: (data: any) => {
                    this.toastr.success('The FAQ has been successfully updated', 'SUCCESS!');
                    this.callback.emit({ data });
                    this.bsModalRef.hide();
                },
                error: (error: any) => {
                    console.log(error);
                    this.toastr.error('An error occurred while updating the FAQ. Please try again', 'ERROR!');
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                }
            });
    }

}
