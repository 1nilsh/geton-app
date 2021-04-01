import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  private currentUser: User;

  constructor(private auth: AuthenticationService) {
    this.auth.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let newHeaders = req.headers;
    if (this.currentUser) {
      newHeaders = newHeaders.append('Authorization', 'Bearer ' + this.currentUser.jwt);
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq);
  }
}
