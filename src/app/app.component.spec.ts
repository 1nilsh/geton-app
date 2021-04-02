import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthenticationService } from './common/auth/service/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { User } from './common/auth/model/user';
import { HomePage } from './home/home.page';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {


  beforeEach(waitForAsync(() => {
    const currentUserMock$ = new Observable<User>(observer => {
      observer.next({
        username: 'foo',
        displayname: 'Foo bar',
        email: 'foo@bar.baz',
        jwt: '1234'
      });
      observer.complete();
    });

    const authServiceMock = jasmine.createSpyObj('AuthenticationService', { getCurrentUser: currentUserMock$ });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        BrowserModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomePage }
        ]),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: ModalController,
          useValue: jasmine.createSpyObj('ModalController', ['create'])
        },
        {
          provide: AuthenticationService,
          useValue: authServiceMock
        },
      ]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
