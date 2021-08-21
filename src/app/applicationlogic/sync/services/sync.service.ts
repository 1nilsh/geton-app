import {Injectable} from '@angular/core';
import {TrainingDataService} from '@app/data/training-data/services/training-data.service';
import {AudioDataService} from '@app/data/audio-data/services/audio-data.service';
import {TrainingStorageService} from '@app/data/training-data/services/training-storage.service';
import {Training} from '@app/data/models/training';
import {AppStateStorageService} from '@app/data/app-state/services/app-state-storage.service';
import {JournalDataService} from '@app/data/journal/journal-data.service';
import {JournalStorageService} from '@app/data/journal/journal-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(
    private trainingDataService: TrainingDataService,
    private audioDataService: AudioDataService,
    private trainingStorageService: TrainingStorageService,
    private appStateStorageService: AppStateStorageService,
    private journalDataService: JournalDataService,
    private journalStorageService: JournalStorageService
  ) {
  }

  public async fullSync(): Promise<void> {
    let allTrainings = [];
    try {
      allTrainings = await this.trainingDataService.getAllUserTrainings().toPromise();
    } catch (e) {
      console.error('Could not sync trainings.', e);
      // TODO: Do not fail silently
      return;
    }

    for (let i = 0; i < allTrainings.length; i++) {
      if (allTrainings[i].enabledFeatures.audio) {
        try {
          allTrainings[i] = await this.addAudioDataToTraining(allTrainings[i]);
        } catch (e) {
          console.error('Could not add audio data to Training', allTrainings[i]);
        }
      }
    }

    await this.trainingStorageService.saveTrainingsToStorage(allTrainings);

    let journalEntries = await this.journalStorageService.loadEntriesFromStorage();
    journalEntries = await this.journalDataService.updateJournalEntries(journalEntries);
    await this.journalStorageService.saveEntriesToStorage(journalEntries);

    await this.appStateStorageService.updateState('lastSync', Date.now());
  }

  public async isSyncNecessary(): Promise<boolean> {
    const lastSync = await this.appStateStorageService.getStateForKey('lastSync');
    const now = Date.now();
    return (now - lastSync) > (1000 * 60 * 30) || !lastSync;
  }

  public async getLastSyncTimestamp(): Promise<number> {
    return await this.appStateStorageService.getStateForKey('lastSync');
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
