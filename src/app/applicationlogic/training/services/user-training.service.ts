import { Injectable } from '@angular/core';
import { Training } from '../../../data/models/training';
import { UserTrainingDataService } from '../../../data/api-data-services/user-training-data.service';
import { Storage } from '@capacitor/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTrainingService {

  private trainings: Training[];
  private selectedTraining: Training;

  private selectedTrainingMessageSource = new BehaviorSubject(null as Training);
  private selectedTraining$ = this.selectedTrainingMessageSource.asObservable();

  constructor(private trainingDataService: UserTrainingDataService) {
  }

  public async getUserTrainings(forceRefresh: boolean = false): Promise<Training[]> {
    if (forceRefresh) {
      this.trainings = await this.trainingDataService.getAllUserTrainings().toPromise();
      this.saveTrainingsToStorage(this.trainings);
      return this.trainings;
    }

    await this.loadTrainingDataFromStorage();

    if (!this.trainings) {
      return await this.getUserTrainings(true);
    }

    return this.trainings;
  }

  public getSelectedTraining(): Observable<Training> {
    this.getUserTrainings();
    return this.selectedTraining$;
  }

  public selectTraining(training: Training): void {
    this.saveSelectedTrainingToStorage(training);
    this.selectedTrainingMessageSource.next(training);
  }

  private async loadTrainingDataFromStorage(): Promise<void> {
    this.trainings = JSON.parse((await Storage.get({ key: 'trainings' })).value);
    this.selectedTrainingMessageSource.next(
      JSON.parse(
        (await Storage.get({ key: 'selected_training' })).value
      )
    );
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