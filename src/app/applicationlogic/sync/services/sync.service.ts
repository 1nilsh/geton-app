import { Injectable } from '@angular/core';
import { TrainingDataService } from '../../../data/training-data/services/training-data.service';
import { AudioDataService } from '../../../data/audio-data/services/audio-data.service';
import { TrainingStorageService } from '../../../data/training-data/services/training-storage.service';
import { Training } from '../../../data/models/training';
import { AppStateStorageService } from '../../../data/app-state/services/app-state-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(
    private userTrainingDataService: TrainingDataService,
    private audioDataService: AudioDataService,
    private trainingStorageService: TrainingStorageService,
    private appStateStorageService: AppStateStorageService
  ) {
  }

  public async fullSync(): Promise<void> {
    const allTrainings = await this.userTrainingDataService.getAllUserTrainings().toPromise();

    for (let i = 0; i < allTrainings.length; i++) {
      if (allTrainings[i].enabledFeatures.audio) {
        allTrainings[i] = await this.addAudioDataToTraining(allTrainings[i]);
      }
    }

    await this.trainingStorageService.saveTrainingsToStorage(allTrainings);

    this.appStateStorageService.updateState('lastSync', Date.now());
  }

  public async isSyncNecessary(): Promise<boolean> {
    const lastSync = await this.appStateStorageService.getStateForKey('lastSync');
    const now = Date.now();
    return (now - lastSync) > (1000 * 60 * 30) || !lastSync;
  }

  private async addAudioDataToTraining(training: Training): Promise<Training> {
    const audiosForTraining = await this.audioDataService.getAudiosForTrainingId(training.id).toPromise();

    training.enabledFeatures.audio = { lessons: [] };
    for (const audio of audiosForTraining) {
      training.enabledFeatures.audio.lessons.push({ name: audio.audioName, location: audio.audioUrl });
    }

    return training;
  }
}
