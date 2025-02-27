import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private readonly primengConfig: PrimeNGConfig,
        private http: HttpClient,
    ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        return this.http.get('https://jsonplaceholder.typicode.com/posts');
    }
}
