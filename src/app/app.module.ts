import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, LoadingController } from '@ionic/angular';

import { AppComponent } from './presentation/app.component';
import { AppRoutingModule } from './app-routing.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './applicationlogic/auth/services/authentication.service';
import { JwtInterceptorService } from './applicationlogic/auth/services/jwt-interceptor.service';
import { SyncService } from './applicationlogic/sync/services/sync.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@environment/environment';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md'
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: LOCALE_ID, useValue: 'de-DE'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private syncService: SyncService, private loadingController: LoadingController, private auth: AuthenticationService) {
    this.auth.getCurrentUser().subscribe(user => {
      this.doSync();
    });
  }

  private async doSync(): Promise<void> {
    if (!(await this.syncService.isSyncNecessary())) {
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Daten werden synchronisiert...',
    });
    await loading.present();

    await this.syncService.fullSync();

    await loading.dismiss();
  }
}
