import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import moment from 'moment';

import { AuthenticationService } from '@services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    isSubmitted: boolean = false;
    year: string = moment().format('Y');

    snowCount: any = Array(1000).map((x, i) => i);

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        console.log(this.snowCount);
        this.form = this.formBuilder.group({
            username: ['email@gmail.com', [Validators.required]],
            password: ['123456', [Validators.required, Validators.minLength(6)]],
            remember: [false]
        });
    }

    ngOnDestroy() {

    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.isSubmitted = true;
        // console.log(this.form.value);
        // stop here if form is invalid
        if (this.form.invalid) {
            console.log('form is invalid');
            this.isSubmitted = false;
            return;
        }

        this.authenticationService.login(this.form.value)
            .then((data: any) => {
                const exp = (JSON.parse(atob(data.user.access_token.split('.')[1]))).exp;
                console.log(moment((exp * 1000)).format('YYYY-MM-DD'));

                this.authenticationService.setSession(data);
                this.router.navigateByUrl('/');
            })
            .catch((err: any) => {
                this.isSubmitted = false;
                Swal.fire('Failed', 'A system error occurred. Please try again!', 'error');
                // console.log(err);
            });
    }

}
