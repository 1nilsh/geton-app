import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationResponse } from '../model/authentication-response';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private messageSource = new BehaviorSubject(null as User);
  public currentUser = this.messageSource.asObservable();

  private url = 'http://192.168.33.10/?rest_route=/app/v1/auth';

  constructor(private http: HttpClient) {
    const currentUser = this.getUser();
    if (currentUser) {
      this.messageSource.next(currentUser);
    }
  }

  public async login(username: string, password: string): Promise<boolean> {
    const authenticationRequest = {username, password};
    try {
      const response = await this.http.post<AuthenticationResponse>(this.url, authenticationRequest)
        .toPromise();
      this.saveUser({username, jwt: response.jwt});
      console.log(response);
      this.messageSource.next({username});
    } catch (error) {
      return false;
    }
    return true;
  }

  public saveUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  public logout(): void {
    sessionStorage.removeItem('user');
    this.messageSource.next(null);
  }
}
