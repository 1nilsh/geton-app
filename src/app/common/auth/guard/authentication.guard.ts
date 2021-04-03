import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  private currentUser: User;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.currentUser) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
