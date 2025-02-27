import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import {Router, RouterLink} from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import {OverlayPanelModule} from "primeng/overlaypanel";
import { ListboxModule} from "primeng/listbox";
import {FlexModule} from "@angular/flex-layout";
import {AuthService} from "../demo/components/auth/service/authService";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [
        `
      .itemMenu {
        width: 100%;
        text-align: center;
        cursor: pointer;
      }
      .itemMenu:hover{
          color: #0b7ad1;
      }
    `
    ],
    imports: [RouterLink, NgClass, NgIf, OverlayPanelModule, ListboxModule, FlexModule],
    standalone: true,
})
export class AppTopBarComponent implements OnInit {
    @Input() isFilter = false;

    items!: MenuItem[];
    itemLogin!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    isLogin =false;

    constructor(public layoutService: LayoutService,private authService :  AuthService,private router: Router) {}


    handleLogin(type : number) {
      switch (type) {
          case 0: {
              void this.router.navigate(['/auth/login'], {
                  state: {
                      login : true
                  },
              });
              break;
          }
          case 1: {
              void this.router.navigate(['/auth/login'], {
                  state: {
                      login : false
                  },
              });
              break;
          }
          case 2: {
              this.authService.logout()
              void this.router.navigate(['/'])
              break;
          }
      }
    }

    handleProfile(): void {
        void this.router.navigate(['/dash'])
    }

    ngOnInit(): void {
     this.isLogin = !!this.authService.getToken()
    }
}
