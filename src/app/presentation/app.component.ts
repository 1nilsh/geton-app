import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../applicationlogic/auth/services/authentication.service';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { User } from '../data/models/user';
import { ImprintPage } from './pages/imprint/imprint.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Training wählen', url: '/select-training', icon: 'flower' },
  ];
  currentUser: User;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private auth: AuthenticationService,
    private modalController: ModalController
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
      this.auth.getCurrentUser().subscribe(user => {
        this.currentUser = user;
      });
    });
  }

  async openImprintModal() {
    const modal = await this.modalController.create({
      component: ImprintPage,
    });
    return await modal.present();
  }
}
