import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Training } from '../../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingDataService {
  private url = environment.api_base_url + '/v1/training-data';

  constructor(private http: HttpClient) {
  }

  public getAllUserTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.url);
  }
}
