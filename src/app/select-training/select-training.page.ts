import { Component, OnInit } from '@angular/core';
import { UserTrainingService } from '../common/training/service/user-training.service';
import { Training } from '../common/training/model/training';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-select-training',
  templateUrl: './select-training.page.html',
  styleUrls: ['./select-training.page.scss'],
})
export class SelectTrainingPage implements OnInit {

  shownTrainings: Training[];
  selectedTraining$ = this.userTrainingService.getSelectedTraining();

  constructor(private userTrainingService: UserTrainingService, private router: Router, private toastController: ToastController) {
  }

  ngOnInit() {
    this.userTrainingService.getUserTrainings().then(trainings => {
      this.shownTrainings = trainings;
    });
  }

  public trainingClickHandler(training: Training): void {
    this.userTrainingService.selectTraining(training);
    this.router.navigateByUrl('/home');
    this.toastController.create({ message: `${training.name} ausgewählt.`, duration: 2000 }).then(toast => {
      toast.present();
    });
  }

  doRefresh(event: Event | any) {
    this.userTrainingService.getUserTrainings(true).then(trainings => {
      this.shownTrainings = trainings;
      event.target.complete();
    });
  }
}
