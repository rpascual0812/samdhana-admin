import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { EmailService } from '@services/email.service';

import * as _ from '../../../utilities/globals';

import { MustMatch, MustValid } from '../../../utilities/form.validators';

import { DateTime } from 'luxon';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    form: FormGroup;
    isSubmitted: boolean = false;
    alert: any = {
        show: false,
        class: 'success'
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private emailService: EmailService
    ) {
        this.form = this.formBuilder.group({
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)])
        }, {
            validator: [MustMatch('password', 'confirm_password')]
        });
    }

    ngOnInit(): void {
        // console.log(1, this.route.snapshot.params['token']);
        this.get();
    }

    get f() { return this.form.controls; }

    get() {
        this.authenticationService.resetToken(this.route.snapshot.params['token'])
            .then((data: any) => {
                // console.log(DateTime.now().setZone('Australia/Adelaide').toFormat('y-LL-dd hh:mm:ss'));
                const server_time = DateTime.fromISO(data.server_time).toMillis();
                const expiration = DateTime.fromISO(data.data.password_reset.expiration).toMillis();

                if (server_time >= expiration) {
                    this.router.navigateByUrl('/404');
                }
            })
            .catch((data: any) => {
                this.router.navigateByUrl('/404');
            });
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.form.invalid) {
            console.log('form is invalid');
            return;
        }

        const data = {
            token: this.route.snapshot.params['token'],
            password: this.form.value.password,
            url: _.BASE_URL
        }
        this.authenticationService.reset(data)
            .then((data: any) => {
                this.alert.class = 'success';
                this.alert.show = true;
                // Swal.fire('Success', 'An email has been sent to ' + this.form.value.email + '!', 'success');
            })
            .catch((data: any) => {
                this.delaySubmit();
                this.alert.class = 'danger';
                this.alert.show = true;
                // Swal.fire('Failed', 'The email address you provided is not a registered user!', 'error');
            });
    }

    delaySubmit() {
        setTimeout(() => {
            this.isSubmitted = false;
        }, 2000);
    }

}
