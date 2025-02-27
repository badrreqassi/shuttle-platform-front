import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService} from "../../demo/components/auth/service/authService";
import {UserTypeEnum} from "../enum/typeUser";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: any): boolean {
        const requiredRole = route.data.role; // Get the required role from the route data
        let userRole !:number
 if(this.authService.isLoggedInAsUser()){
     userRole = UserTypeEnum.NORMAL
 }
 if(this.authService.isLoggedInAsCompany()){
     userRole = UserTypeEnum.COMPANY
 }
        if ( userRole === requiredRole) {
            return true; // Allow access to the route
        } else {
            this.router.navigate(['/filter']); // Redirect to an unauthorized page
            return false; // Deny access to the route
        }
    }
}
