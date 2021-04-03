import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../common/auth/model/user';
import { AuthenticationService } from '../common/auth/service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: User;

  constructor(private auth: AuthenticationService, private router: Router) {

  }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

}
