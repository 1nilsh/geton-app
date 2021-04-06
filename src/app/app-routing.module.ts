import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './common/auth/guard/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'imprint',
    loadChildren: () => import('./imprint/imprint.module').then(m => m.ImprintPageModule)
  },
  {
    path: 'select-training',
    loadChildren: () => import('./select-training/select-training.module').then( m => m.SelectTrainingPageModule),
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
