import { Component, OnInit } from '@angular/core';
import { SyncService } from '@app/applicationlogic/sync/services/sync.service';
import { AuthenticationService } from '@app/applicationlogic/auth/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  currentUser$ = this.auth.getCurrentUser();
  lastSync$ = this.syncService.getLastSyncTimestamp();
  syncIsInProgress: boolean;

  constructor(private syncService: SyncService, private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  handleClickLogout() {
    this.auth.logout().then(r => {
      this.router.navigateByUrl('/login');
    });
  }

  handleClickSync() {
    this.syncIsInProgress = true;
    this.syncService.fullSync().then(r => {
      this.syncIsInProgress = false;
    });
  }
}
