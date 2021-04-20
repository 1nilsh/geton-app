import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '@app/data/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  private currentUser: User;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.getCurrentUser().subscribe((user: User) => {
      console.log(user);
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
