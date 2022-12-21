import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '@services/authentication.service';


@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.logout();
    }

    logout() {
        this.authenticationService
            .logout()
            .subscribe({
                next: (data: any) => {
                    localStorage.removeItem('o__token');
                    this.router.navigate(['/auth']);
                },
                error: (error: any) => {
                    console.log(error);
                    this.toastr.error('An error occurred while updating the FAQ. Please try again', 'ERROR!');
                },
                complete: () => {
                    console.log('Complete');
                }
            });
        // .then((data: any) => {
        //     this.authenticationService.unsetSession();
        //     this.router.navigateByUrl('/auth');
        // })
        // .catch((err: any) => {

        //     Swal.fire('Failed', 'A system error occurred. Please try again!', 'error');
        // });
    }

}
