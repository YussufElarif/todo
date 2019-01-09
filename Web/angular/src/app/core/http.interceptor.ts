import { Injectable } from '@angular/core';
import { HttpInterceptor as AngularHttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Filters } from './filters.helper';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptor implements AngularHttpInterceptor
{
    constructor() { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        req = req.clone({
            url: environment.api + req.url,
            params: Filters.remove().params(req)
        });

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => event)
        );
    }
}