import { Injectable } from '@angular/core';
import { Training } from '../models/training';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTrainingDataService {
  private url = environment.api_base_url + '/v1/training-data';

  constructor(private http: HttpClient) {
  }

  public getAllUserTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.url);
  }
}
