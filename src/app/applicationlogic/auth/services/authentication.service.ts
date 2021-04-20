import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@app/data/models/user';
import { Storage } from '@capacitor/core';
import { environment } from '@environment/environment';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private messageSource = new BehaviorSubject(null as User);
  private currentUser$ = this.messageSource.asObservable();

  private url = environment.api_base_url + '/v1/auth';

  constructor(private http: HttpClient) {
    this.loadUserFromStorage().then(user => {
      this.messageSource.next(user);
    });
  }

  public async login(username: string, password: string): Promise<boolean> {
    const authenticationRequest = { username, password };

    const response = await this.http.post<User>(this.url, authenticationRequest)
      .toPromise();
    this.saveUser(response);

    this.messageSource.next(response);

    return true;
  }

  public saveUser(user: User): void {
    Storage.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser$;
  }

  public async logout(): Promise<void> {
    await Storage.remove({ key: 'user' });
    this.messageSource.next(null);
    // @Todo: Clear all data
  }

  private async loadUserFromStorage(): Promise<User> {
    const data = await Storage.get({ key: 'user' });
    return JSON.parse(data.value);
  }
}
