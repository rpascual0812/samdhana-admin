import { Component, OnInit } from '@angular/core';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    public user;
    public menu = MENU;

    constructor(public appService: AppService) {}

    ngOnInit() {
        this.user = this.appService.user;

        this.user = {
            picture: 'assets/img/default-profile.png',
            email: 'rpascual0812@gmail.com'
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
