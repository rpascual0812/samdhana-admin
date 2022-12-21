import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '@services/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
    public searchForm: FormGroup;

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.searchForm = new FormGroup({
            search: new FormControl(null)
        });
    }

    logout() {
        this.authenticationService.logout();
    }

}
