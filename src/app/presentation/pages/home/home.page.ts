import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/applicationlogic/auth/services/authentication.service';
import { UserTrainingService } from '@app/applicationlogic/training/services/user-training.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser$ = this.auth.getCurrentUser();
  currentTraining$ = this.trainingService.getSelectedTraining();

  constructor(
    private auth: AuthenticationService,
    private trainingService: UserTrainingService
  ) {
  }

  ngOnInit() {
  }
}
