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
  user: User;

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    if (this.auth.getUser() == null) {
      this.router.navigateByUrl('/login');
    }
    this.auth.currentUser.subscribe(user => {
      this.user = user;
    });
  }

}
