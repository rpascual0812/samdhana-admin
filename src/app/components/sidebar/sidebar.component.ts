import { Component, OnInit } from '@angular/core';
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
        private userService: UserService
    ) { }

    ngOnInit() {
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
