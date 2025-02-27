import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {AuthService} from "../demo/components/auth/service/authService";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService ,private authService  : AuthService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                visible: true,
                items: [
                    {
                        label: 'Dashboard',
                        visible: true,
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dash'],
                    },
                ],
            },
            {
                label: 'Subscriptions offer',
                visible : true,
                items: [
                    {
                        label: 'Create Subscription ',
                        visible: this.authService.isLoggedInAsCompany(),
                        routerLink: ['/subscription/create'],
                    },
                    {
                        label: 'List Subscriptions ',
                        visible: true,
                        routerLink: ['/subscription/list'],
                    },
                ],
            },
            {
                label: 'Buses',
                visible : this.authService.isLoggedInAsCompany(),
                items: [
                    {
                        label: 'List Buses',
                        visible: true,
                        routerLink: ['/bus/list'],
                    },
                    {
                        label: 'Create Buse',
                        visible: true,
                        routerLink: ['/bus/create'],
                     },
                ],
            },
            {
                label: 'Request Subscriptions',
                visible: true,
                items: [
                    {
                        label: 'List Request Subscriptions ',
                        visible : true,
                         routerLink: ['/request/list'],
                    },
                    {
                        label: 'Create Request Subscriptions ',
                        visible : this.authService.isLoggedInAsUser(),
                        routerLink: ['/request/create'],
                    },
                ],
            },
        ];
    }
}
