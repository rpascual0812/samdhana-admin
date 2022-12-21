import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { DateTime } from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.user = {
            picture: 'assets/img/default-profile.png',
            email: 'rpascual0812@gmail.com'
        }
    }

    logout() {
        this.authenticationService.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
