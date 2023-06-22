import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TexteditorComponent } from '@components/texteditor/texteditor.component';
import { ConfigurationService } from '@services/configuration.service';

declare var tinymce: any;

@Component({
    selector: 'app-email-templates',
    templateUrl: './email-templates.component.html',
    styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent implements OnInit {
    @ViewChild('welcome') welcomeEditor: TexteditorComponent;
    form: FormGroup;
    loading: boolean = false;

    submitted: boolean = false;

    templates = {
        welcome_subject: '',
        welcome_email: ''
    }

    variables = ['first_name', 'middle_name', 'last_name'];

    constructor(
        private formBuilder: FormBuilder,
        private configurationService: ConfigurationService,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        tinymce.init(
            {
                selector: "#welcome",
            }
        );
        this.setForm();
        this.fetch();
    }

    setForm() {
        this.form = this.formBuilder.group({
            welcome_subject: [this.templates.welcome_subject ? this.templates.welcome_subject : '', Validators.required],
            welcome_email: [this.templates.welcome_email ? this.templates.welcome_email : '', Validators.required],
        });
    }

    fetch() {
        this.configurationService.fetchAll({ 'group': 'email_templates' })
            .subscribe({
                next: (data: any) => {
                    data.data.forEach((template) => {
                        this.templates[template.name] = template.value;
                    });
                    this.form.get('welcome_subject').patchValue(this.templates['welcome_subject']);
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

    get f() { return this.form.controls; }

    submit() {

        const welcome = this.welcomeEditor.returnMessage();
        this.form.get('welcome_email').patchValue(welcome);

        if (this.form.invalid) {
            this.toastr.error('Please complete the form.', 'ERROR!');
            return;
        }

        this.configurationService
            .save({ group: 'email_templates', data: this.form.value })
            .subscribe({
                next: (data: any) => {
                    this.toastr.success('The email templates have been successfully updated', 'SUCCESS!');
                },
                error: (error: any) => {
                    console.log(error);
                    this.toastr.error('An error occurred while updating the user agreement. Please try again', 'ERROR!');
                    setTimeout(() => { this.loading = false; }, 500);
                },
                complete: () => {
                    console.log('Complete');
                    setTimeout(() => { this.loading = false; }, 500);
                }
            });
    }

}
