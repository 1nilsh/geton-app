import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './applicationlogic/auth/guard/authentication.guard';
import { ImprintPage } from './presentation/pages/imprint/imprint.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./presentation/pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./presentation/pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'imprint',
    loadChildren: () => import('./presentation/pages/imprint/imprint.module').then(m => m.ImprintPageModule)
  },
  {
    path: 'select-training',
    loadChildren: () => import('./presentation/pages/select-training/select-training.module').then(m => m.SelectTrainingPageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'audio-training',
    loadChildren: () => import('./presentation/pages/audio-training/audio-training.module').then(m => m.AudioTrainingPageModule),
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
