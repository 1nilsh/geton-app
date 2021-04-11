import { Injectable } from '@angular/core';
import { UserTrainingService } from './user-training.service';
import { AudioDataService } from '../../../data/api-data-services/audio-data.service';
import { Audio } from '../../../data/models/audio';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audiosMessageSource = new BehaviorSubject([] as Audio[]);
  private audios$ = this.audiosMessageSource.asObservable();

  constructor(private userTrainingService: UserTrainingService, private audioDataService: AudioDataService) {
    this.matchAudiosAndTrainings();
  }

  public getAllActiveAudiosForCurrentTraining(): Observable<Audio[]> {
    return this.audios$;
  }

  private matchAudiosAndTrainings(): void {
    this.userTrainingService.getSelectedTraining().subscribe(selectedTraining => {
      if (selectedTraining) {
        this.audioDataService.getAudiosForTrainingId(selectedTraining.id).subscribe(audios => {
          for (const audio of audios) {
            if (audio.lektionId === selectedTraining.id) {
              audio.lesson = {
                id: selectedTraining.id,
                name: selectedTraining.name
              };
            } else {
              audio.lesson = selectedTraining.lessons.find(l => l.id === audio.lektionId);
            }
          }
          console.log(audios);
          this.audiosMessageSource.next(audios);
        });
      }
    });
  }
}
