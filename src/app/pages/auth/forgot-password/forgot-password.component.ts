import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    form: FormGroup;
    isSubmitted: boolean = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        console.log('reset password');
        this.form = this.formBuilder.group({
            email: ['', [Validators.required]],
        });
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

        this.authenticationService.forgot({ email: this.form.value.email, url: window.location.origin, device: 'web' })
            .then((data: any) => {
                Swal.fire('Success', 'An email has been sent to ' + this.form.value.email + '!', 'success');
            })
            .catch((data: any) => {
                Swal.fire('Failed', 'The email address you provided is not a registered user!', 'error');
            });
    }

}
