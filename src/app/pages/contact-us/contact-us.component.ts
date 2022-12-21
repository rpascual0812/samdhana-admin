import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TexteditorComponent } from '@components/texteditor/texteditor.component';
import { ContactUsService } from '@services/contact-us.service';
import { EmailService } from '@services/email.service';
import Swal from 'sweetalert2';
import { MustValid } from '../../utilities/form.validators';

declare var tinymce: any;
@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
    @ViewChild(TexteditorComponent) textEditor: TexteditorComponent;

    form: FormGroup;
    isSubmitted: boolean = false;
    message: string = '';
    invalid: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private contactUsService: ContactUsService,
        private emailService: EmailService
    ) { }

    ngOnInit(): void {
        tinymce.init(
            {
                selector: "#message",
            }
        );

        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            subject: ['', [Validators.required]],
            message: ['', [Validators.required]]
        }, {
            validator: [MustValid('email', this.emailService)]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.message = this.textEditor.returnMessage();
        this.form.patchValue({ message: this.message });

        if (this.form.invalid) {
            console.log('form is invalid');
            Swal.fire('Error!', 'The message is empty. Please let us know your inquiry in the text editor below.', 'error');
            return;
        }

        this.emailService.checkEmail(this.form.value.email)
            .then((data: any) => {
                if (data.status) {
                    this.isSubmitted = true;
                    this.save();
                }
                else {
                    Swal.fire('Error', 'The email you provided is invalid!', 'error');
                }
            })
            .catch((err: any) => {
                Swal.fire('Failed', 'An error occurred! Please try again.', 'error');
            });
    }

    save() {
        // console.log(this.form.value);
        this.contactUsService.save(this.form.value)
            .then((data: any) => {
                Swal.fire('Success', 'Your inquiry has been submitted!', 'success');
                this.form.reset();
                this.textEditor.reset();
                this.isSubmitted = false;
            })
            .catch((err: any) => {
                this.isSubmitted = false;
                Swal.fire('Failed', 'A system error occurred. Please try again!', 'error');
            });
    }

}
