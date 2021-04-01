import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../common/auth/service/authentication.service';
import { User } from '../common/auth/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: User;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (!this.currentUser) {
      this.router.navigateByUrl('/login');
    }
  }

}
