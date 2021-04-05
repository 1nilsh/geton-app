import { Component, OnInit } from '@angular/core';
import { UserTrainingService } from '../common/training/service/user-training.service';
import { Training } from '../common/training/model/training';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-training',
  templateUrl: './select-training.page.html',
  styleUrls: ['./select-training.page.scss'],
})
export class SelectTrainingPage implements OnInit {

  showTrainings$ = this.userTrainingService.getUserTrainings();
  selectedTraining$ = this.userTrainingService.getSelectedTraining();

  constructor(private userTrainingService: UserTrainingService, private router: Router) {
  }

  ngOnInit() {
  }

  public trainingClickHandler(training: Training): void {
    this.userTrainingService.selectTraining(training);
    this.router.navigateByUrl('/home');
  }

}
