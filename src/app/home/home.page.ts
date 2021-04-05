import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../common/auth/model/user';
import { AuthenticationService } from '../common/auth/service/authentication.service';
import { Training } from '../common/training/model/training';
import { UserTrainingService } from '../common/training/service/user-training.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: User;
  currentTraining$: Observable<Training>;

  constructor(private auth: AuthenticationService, private trainingService: UserTrainingService) {

  }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });
    this.currentTraining$ = this.trainingService.getSelectedTraining();
  }

}
