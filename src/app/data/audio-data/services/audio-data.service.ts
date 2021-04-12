import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AudioDto } from '../helper-models/audio-dto';

@Injectable({
  providedIn: 'root'
})
export class AudioDataService {
  private url = environment.api_base_url + '/v1/audio';

  constructor(private http: HttpClient) {
  }

  public getAudiosForTrainingId(trainingId: number): Observable<AudioDto[]> {
    return this.http.get<AudioDto[]>(this.url, { params: new HttpParams({ fromString: 'trainingId=' + trainingId }) });
  }
}
