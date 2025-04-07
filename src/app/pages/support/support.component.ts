import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, } from '@angular/forms';
import { TexteditorComponent } from '@components/texteditor/texteditor.component';
import { SupportService } from '@services/support.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import Swal from 'sweetalert2';

declare var tinymce: any;
@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
    @ViewChild(TexteditorComponent) textEditor: TexteditorComponent;

    form: FormGroup;
    isSubmitted: boolean = false;
    message: string = '';

    tickets: any = [];
    // message: string;

    constructor(
        private formBuilder: FormBuilder,
        private supportService: SupportService,
    ) { }

    ngOnInit(): void {
        tinymce.init(
            {
                selector: "#message",
            }
        );

        this.form = this.formBuilder.group({
            category: ['', [Validators.required]],
            subject: ['', [Validators.required]],
            message: ['', [Validators.required]]
        });

        this.getHistory();
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.message = this.textEditor.returnMessage();
        this.form.patchValue({ message: this.message });

        if (this.form.invalid) {
            console.log('form is invalid');
            Swal.fire('We are here to help!', 'The message is empty. Please let us know your concern in the text editor below.', 'error');
            return;
        }
        this.isSubmitted = true;

        // console.log(this.form.value);
        this.supportService.save(this.form.value)
            .then((data: any) => {
                Swal.fire('Success', 'A ticket was successfully submitted!', 'success');
                this.getHistory();
            })
            .catch((err: any) => {
                this.isSubmitted = false;
                Swal.fire('Failed', 'A system error occurred. Please try again!', 'error');
            });
    }

    reset() {
        this.form.reset();
        this.textEditor.reset();
        this.isSubmitted = false;
    }

    getHistory() {
        this.supportService.fetchAll({ take: 10, skip: 0 })
            .then((data: any) => {
                this.tickets = data;
                console.log(data);
            });
    }

}