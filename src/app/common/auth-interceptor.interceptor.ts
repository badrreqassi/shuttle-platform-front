import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        console.log(req);
        /*
      // Clone the request to add custom headers
     const modifiedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`, // Replace with your token logic
            },
        });*/

        // Pass the modified request to the next handler
        return next.handle(req);
    }
}
