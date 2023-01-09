import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import * as _ from '../../utilities/globals';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    url: String = _.BASE_URL;
    public user;
    public menu = MENU;

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        console.log(this.router.url);
        this.fetch();
    }

    fetch() {
        this.userService.fetch()
            .subscribe({
                next: (data: any) => {
                    this.user = data;
                    this.user.image = this.url + (this.user.user_document ? '' : '/assets/images/user.png');
                },
                error: (error: any) => {
                    console.log(error);
                },
                complete: () => {
                    console.log('Complete');
                }
            });
    }

    setActive(type: any) {
        if (this.router.url.includes(type)) {
            return 'active';
        }
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        path: ['/']
    },
    {
        name: 'Blank',
        path: ['/blank']
    },
    {
        name: 'Main Menu',
        children: [
            {
                name: 'Sub Menu',
                path: ['/sub-menu-1']
            },

            {
                name: 'Blank',
                path: ['/sub-menu-2']
            }
        ]
    }
];
