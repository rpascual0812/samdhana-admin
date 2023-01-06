import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TexteditorComponent } from '@components/texteditor/texteditor.component';
import { ConfigurationService } from '@services/configuration.service';

declare var tinymce: any;
@Component({
    selector: 'app-agreement',
    templateUrl: './agreement.component.html',
    styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {
    @ViewChild('disclaimer') disclaimerEditor: TexteditorComponent;
    @ViewChild('legal') legalEditor: TexteditorComponent;
    @ViewChild('terms') termsEditor: TexteditorComponent;
    form: FormGroup;
    loading: boolean = false;

    agreement: any = {
        disclaimer: {},
        legal: {},
        terms: {}
    }


    submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private configurationService: ConfigurationService,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        tinymce.init(
            {
                selector: "#message",
            }
        );

        this.setForm();
        this.fetch();
    }

    setForm() {
        this.form = this.formBuilder.group({
            disclaimer: [this.agreement.disclaimer ? this.agreement.disclaimer : '', Validators.required],
            legal: [this.agreement.legal ? this.agreement.legal : '', Validators.required],
            terms: [this.agreement.terms ? this.agreement.terms : '', Validators.required],
        });
    }

    get f() { return this.form.controls; }

    fetch() {
        this.configurationService.fetchAll({ 'group': 'agreement' })
            .subscribe({
                next: (data: any) => {
                    // console.log('configuration', data.data);
                    data.data.forEach((agreement) => {
                        this.agreement[agreement.name] = agreement.value;
                        // if (agreement.name == 'disclaimer') {
                        //     this.disclaimerEditor.setContent();
                        // }
                    });
                    // console.log(this.agreement);
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

    submit() {
        const disclaimer = this.disclaimerEditor.returnMessage();
        const legal = this.legalEditor.returnMessage();
        const terms = this.termsEditor.returnMessage();

        this.form.get('disclaimer').patchValue(disclaimer);
        this.form.get('legal').patchValue(legal);
        this.form.get('terms').patchValue(terms);
        // console.log(disclaimer, legal, terms);
        // console.log(this.form.invalid);
        if (this.form.invalid) {
            this.toastr.error('Please complete the form.', 'ERROR!');
            return;
        }

        console.log('submitting');

        this.configurationService
            .save(this.form.value)
            .subscribe({
                next: (data: any) => {
                    this.toastr.success('The user agreement has been successfully updated', 'SUCCESS!');
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
