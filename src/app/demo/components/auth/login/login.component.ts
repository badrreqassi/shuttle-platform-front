import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/authService";
import {Location} from "@angular/common";

import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserRequest} from "../../TransportCompany/model/request/UserRequest";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    loginForm: FormGroup;
     state!:  boolean ;
    isCompany  = false
    constructor( private readonly router: Router,private readonly messageService: MessageService,private readonly location: Location,public layoutService: LayoutService,private readonly fb: FormBuilder , private readonly authService :AuthService) {
        if(this.location.getState()){
            this.state = (this.location.getState() as {login : boolean}).login;
            if(this.state){
                this.loginForm = this.fb.group({
                    username: ['', [Validators.required]],
                    password: ['', [Validators.required, Validators.minLength(6)]]
                });
            }else {
                this.loginForm = this.fb.group({
                    username: ['', [Validators.required]],
                    email: ['', [Validators.required, Validators.email]],
                    password: ['', [Validators.required, Validators.minLength(6)]]
                });
            }


        }


    }

    onSubmit():void {
        if(this.loginForm.valid){
            const formValue = this.loginForm.value;
            // login
            if(this.state){
                this.authService.login(formValue.username, formValue.password).subscribe(
                    (data)=>{
                        if(data[0] || data[1] ) {
                           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'you logged in' });
                            this.location.back();
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not found. Please check your credentials' });
                        }
                    }

                )


            } else {
                // Sign in

                const request = {
                    username: formValue.username,
                    email: formValue.email,
                    password: formValue.password,
                } as UserRequest
                if(this.isCompany){
this.authService.createUserTransportCompany(request).subscribe(
    (data)=> {
        if(data){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'you logged in' });
            this.location.back();
        }else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'somthing went wrong' });
        }
    }
)
                } else {
                    this.authService.createNormalUser(request).subscribe(
                        (data)=> {
                            if(data){
                                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'you logged in' });
                                this.location.back();
                            }else {
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'somthing went wrong' });
                            }
                        }
                    )

                }
            }
        }

    }
}
