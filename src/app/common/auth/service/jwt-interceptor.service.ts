import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

    constructor(private auth: AuthenticationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.auth.getUser();
        let newHeaders = req.headers;
        if (user) {
            newHeaders = newHeaders.append('Authorization', 'Bearer ' + user.jwt);
        }
        const authReq = req.clone({headers: newHeaders});
        return next.handle(authReq);
    }
}
