import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpStatus } from './HttpStatus';

@Injectable()
export class ResponseInterceptorService implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        if (req.responseType === 'json') {
            return this.handleResponse(req, next);
        }
        return next.handle(req);
    }
    private handleResponse(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return this.parseResponse(event);
            }),
            catchError((error: HttpErrorResponse) => {
                return this.processErrorResponse(error);
            }),
        );
    }
    private parseResponse(event: HttpEvent<any>): HttpEvent<any> {
        if (event instanceof HttpResponse && event.ok) {
            return event.clone({ body: event.body.data});
        } else {
            return event;
        }
    }
    private processErrorResponse(
        httpErrorResponse: HttpErrorResponse,
    ): Observable<any> {
        if (httpErrorResponse.status) {
            return this.extractHttpMessage(httpErrorResponse);
        } else {
            if (httpErrorResponse.error) {
                return throwError(httpErrorResponse.error);
            } else {
                return of(null);
            }
        }
    }
    private extractHttpMessage(httpCode: HttpErrorResponse): Observable<never> {
        switch (httpCode.status.toString()) {
            case '500': {
                return throwError(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            case '409': {
                return throwError(httpCode.error.error);
            }
            case '401': {
                //   this.authService.logout();
                return throwError(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            case '404': {
                return throwError(HttpStatus.NOT_FOUND);
            }
            default:
                return throwError(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
