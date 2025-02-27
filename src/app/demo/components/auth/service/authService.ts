import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {TransportCompany, User} from "../../TransportCompany/model/response/TransportCompany";
import {environment} from "../../../../../environments/environment";
import {UserRequest} from "../../TransportCompany/model/request/UserRequest";
import {WrapperProfileBff} from "../model/response/WrapperProfileBff";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'authToken'; // Key for storing the token in local storage

    constructor(private http: HttpClient, private router: Router) {}

    // Method to log in the user
    login(username: string, password: string ): Observable<any> {

        const transportCompanyLogin = this.http.get<TransportCompany>(environment.mainApiUrl+`/transportCompany/login/${username}/${password}`).pipe(
                tap(response => {
                    if (response) {
                        localStorage.setItem(this.tokenKey+'company', JSON.stringify(response)); // Save the token
                    }
                }),
                catchError(error => {
                    console.error('Login failed', error);
                    return of(null);
                })
            );

        const normalUserLogin = this.http.get<User>(environment.mainApiUrl+`/user/login/${username}/${password}`).pipe(
            tap(response => {
                if (response) {
                    console.log('user')
                     localStorage.setItem(this.tokenKey+'user', JSON.stringify(response)); // Save the token
                }
            }),
            catchError(error => {
                console.error('Login failed', error);
                return of(null);
            })
        );
        return combineLatest(transportCompanyLogin, normalUserLogin);
    }

    // Method to log out the user
    logout(): void {
        localStorage.removeItem(this.tokenKey+'company'); // Remove the token
        localStorage.removeItem(this.tokenKey+'user'); // Remove the token
        this.router.navigate(['/filter']); // Redirect to the login page
    }

    // Method to check if the user is logged in
    isLoggedInAsUser(): boolean {
        const token = localStorage.getItem(this.tokenKey+'user');
        return !!token; // Return true if the token exists
    }
    // Method to check if the user is logged in
    isLoggedInAsCompany(): boolean {
        const token = localStorage.getItem(this.tokenKey+'company');
        return !!token; // Return true if the token exists
    }

    // Method to get the authentication token
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey+'company')??localStorage.getItem(this.tokenKey+'user')  ;
    }

    createUserTransportCompany(request : UserRequest): Observable<TransportCompany> {
        return this.http.post<TransportCompany>(environment.mainApiUrl + `/transportCompany/create`,request).pipe(
            tap(response => {
                if (response) {
                    localStorage.setItem(this.tokenKey + 'company', JSON.stringify(response)); // Save the token
                }
            }),
            catchError(error => {
                console.error('Login failed', error);
                return of(null);
            })
        );
    }
    createNormalUser(request : UserRequest): Observable<User> {
        return this.http.post<TransportCompany>(environment.mainApiUrl + `/user/create`,request).pipe(
            tap(response => {
                if (response) {
                    localStorage.setItem(this.tokenKey + 'user', JSON.stringify(response)); // Save the token
                }
            }),
            catchError(error => {
                console.error('Login failed', error);
                return of(null);
            })
        );
    }
    getProfileBff(id  :number , typeUser :string): Observable<WrapperProfileBff> {
        return this.http.get<WrapperProfileBff>(environment.mainApiUrl + `/${typeUser}/bffProfile/${id}`);
    }
}
