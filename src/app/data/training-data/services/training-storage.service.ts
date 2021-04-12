import { Injectable } from '@angular/core';
import { Filesystem, FilesystemDirectory, Storage } from '@capacitor/core';
import { Training } from '../../models/training';
import { DownloadService } from '../../../infrastructure/download/download.service';

@Injectable({
  providedIn: 'root'
})
// @Todo: implement SQLite
export class TrainingStorageService {

  constructor(private downloadService: DownloadService) {
  }

  async saveTrainingsToStorage(trainings: Training[]): Promise<void> {
    for (let i = 0; i < trainings.length; i++) {
      const image = await this.downloadService.downloadBlob(trainings[i].image);
      trainings[i].image = image.blob;
    }

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
