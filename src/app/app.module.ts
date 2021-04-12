import { NgModule } from '@angular/core';
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
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private syncService: SyncService, private loadingController: LoadingController) {
    this.doSync();
  }

  private async doSync(): Promise<void> {
    if (! await this.syncService.isSyncNecessary()) {
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Daten werden synchronisiert...',
    });
    await loading.present();

    await this.syncService.fullSync();

    loading.dismiss();
  }
}
