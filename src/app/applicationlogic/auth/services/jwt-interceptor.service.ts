import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from '@app/data/models/user';

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
    if (req.headers.has('skip')) {
      req = req.clone({
        headers: req.headers.delete('skip')
      });
      return next.handle(req);
    }

    let newHeaders = req.headers;
    if (this.currentUser && req.url !== 'http://192.168.33.10/wp-content/uploads/2021/04/Dankbarkeit.jpeg') {
      newHeaders = newHeaders.append('Authorization', 'Bearer ' + this.currentUser.jwt);
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq);
  }
}
