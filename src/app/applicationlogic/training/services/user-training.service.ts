import { Injectable } from '@angular/core';
import { Training } from '../../../data/models/training';
import { BehaviorSubject, Observable } from 'rxjs';
import { TrainingStorageService } from '../../../data/training-data/services/training-storage.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserTrainingService {

  private trainings: Training[];

  private selectedTraining: Training;

  private selectedTrainingMessageSource = new BehaviorSubject(null as Training);
  private selectedTraining$ = this.selectedTrainingMessageSource.asObservable();

  constructor(private trainingStorageService: TrainingStorageService) {
  }

  public async getUserTrainings(): Promise<Training[]> {
    if (!this.trainings) {
      this.trainings = await this.trainingStorageService.loadTrainingsFromStorage();
    }

    return this.trainings;
  }

  public getSelectedTraining(): Observable<Training> {
    if (!this.selectedTraining) {
      this.trainingStorageService.loadSelectedTrainingFromStorage().then(training => {
        this.selectedTraining = training;
        this.selectedTrainingMessageSource.next(this.selectedTraining);
      });
    }
    return this.selectedTraining$.pipe(filter(value => value !== null));
  }

  public selectTraining(training: Training): void {
    this.trainingStorageService.saveSelectedTrainingToStorage(training);
    this.selectedTrainingMessageSource.next(training);
  }


}
