import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {AuthService} from "../auth/service/authService";
import {WrapperProfileBff} from "../auth/model/response/WrapperProfileBff";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
     data!: WrapperProfileBff;
      company =false;

    constructor(
        private readonly authService :AuthService,
        public layoutService: LayoutService,
    ) {
    }

    ngOnInit() {
        const userId = JSON.parse(this.authService.getToken()).id;
         if(this.authService.isLoggedInAsCompany()){
             this.company = true;
             this.authService.getProfileBff(userId,'transportCompany').subscribe(
                (data)=> {
                    this.data = data;
                    console.log(this.data)
                }
            )
        } else {
            this.authService.getProfileBff(userId,'user').subscribe(
                (data)=> {
                    this.data = data;
                }
            )
        }

    }
}
