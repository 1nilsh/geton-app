import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './common/auth/service/authentication.service';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { User } from './common/auth/model/user';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public selectedIndex = 0;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
  ];
  currentUser: User;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private auth: AuthenticationService,
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === '/' + path.toLowerCase());
    }
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      this.auth.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    });
  }
}
