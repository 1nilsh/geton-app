import { Injectable } from '@angular/core';
import { Training } from '../model/training';
import { UserTrainingDataService } from './user-training-data.service';
import { Storage } from '@capacitor/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTrainingService {

  private trainings: Training[];

  private selectedTrainingMessageSource = new BehaviorSubject(null as Training);
  private selectedTraining = this.selectedTrainingMessageSource.asObservable();

  constructor(private trainingDataService: UserTrainingDataService) {
    this.loadTrainingDataFromStorage();
  }

  public async getUserTrainings(forceRefresh: boolean = false): Promise<Training[]> {
    if (forceRefresh) {
      this.trainings = await this.trainingDataService.getAllUserTrainings().toPromise();
      this.saveTrainingsToStorage(this.trainings);
      return this.trainings;
    }

    if (!this.trainings) {
      return await this.getUserTrainings(true);
    }

    return this.trainings;
  }

  public getSelectedTraining(): Observable<Training> {
    return this.selectedTraining;
  }

  public selectTraining(training: Training): void {
    this.saveSelectedTrainingToStorage(training);
    this.selectedTrainingMessageSource.next(training);
  }

  private loadTrainingDataFromStorage(): void {
    Storage.get({ key: 'trainings' }).then(data => {
      this.trainings = JSON.parse(data.value);
    });
    Storage.get({ key: 'selected_training' }).then(data => {
      this.selectedTrainingMessageSource.next(JSON.parse(data.value));
    });
  }

  private saveTrainingsToStorage(trainings: Training[]): void {
    Storage.set({
      key: 'trainings',
      value: JSON.stringify(trainings)
    });
  }

  private saveSelectedTrainingToStorage(training: Training): void {
    Storage.set({
      key: 'selected_training',
      value: JSON.stringify(training)
    });
  }
}
