import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Audio } from '../models/audio';

@Injectable({
  providedIn: 'root'
})
export class AudioDataService {
  private url = environment.api_base_url + '/v1/audio';

  constructor(private http: HttpClient) {
  }

  public getAudiosForTrainingId(trainingId: number): Observable<Audio[]> {
    return this.http.get<Audio[]>(this.url, { params: new HttpParams({ fromString: 'trainingId=' + trainingId }) });
  }
}
