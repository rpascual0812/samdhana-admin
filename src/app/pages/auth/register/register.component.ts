import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import moment from 'moment';
import * as _ from '../../../utilities/globals';

import { AuthenticationService } from '@services/authentication.service';
import { EmailService } from '@services/email.service';
import { MustMatch, MustValid } from '../../../utilities/form.validators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    isSubmitted: boolean = false;
    confirm: any;
    moment: any = moment;

    years: any;
    months: any;
    days: any;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private emailService: EmailService
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            first_name: ['', [Validators.required]],
            middle_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
            mobile: ['', [Validators.required]], //, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
            year: ['', [Validators.required]],
            month: ['', [Validators.required]],
            day: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirm_password: ['', [Validators.required, Validators.minLength(6)]],
            terms: [false, [Validators.requiredTrue]],
        }, {
            validator: [MustMatch('password', 'confirm_password'), MustValid('email', this.emailService)]
        });

        this.years = _.YEARS();
        this.months = _.MONTHS();
        this.days = _.DAYS(this.form.value.year, this.form.value.month);
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.isSubmitted = true;
        // console.log(this.form.value);
        // stop here if form is invalid
        if (this.form.invalid) {
            console.log('form is invalid');
            return;
        }

        this.authenticationService.register(this.form.value)
            .then((data: any) => {
                Swal.fire('Success', 'An email has been sent to ' + this.form.value.email + '!', 'success');
            })
            .catch((err: any) => {
                Swal.fire('Failed', 'A system error occurred. Please try again!', 'error');
            });
    }

    numbersOnly(event: any) {
        return _.numbersOnly(event);
    }

    yearChanged() {
        this.days = _.DAYS(this.form.value.year, this.form.value.month);
    }

    monthChanged() {
        this.days = _.DAYS(this.form.value.year, this.form.value.month);
    }
}

