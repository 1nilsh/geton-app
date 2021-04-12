import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core';
import { Training } from '../../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingStorageService {

  constructor() {
  }

  async saveTrainingsToStorage(trainings: Training[]): Promise<void> {
    return Storage.set({
      key: 'trainings',
      value: JSON.stringify(trainings)
    });
  }

  async saveSelectedTrainingToStorage(training: Training): Promise<void> {
    return Storage.set({
      key: 'selected_training',
      value: JSON.stringify(training)
    });
  }

  async loadTrainingsFromStorage(): Promise<Training[]> {
    return JSON.parse((await Storage.get({ key: 'trainings' })).value);
  }

  async loadSelectedTrainingFromStorage(): Promise<Training> {
    return JSON.parse(
      (await Storage.get({ key: 'selected_training' })).value
    );
  }
}
