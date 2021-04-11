import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioTrainingPage } from './audio-training.page';

const routes: Routes = [
  {
    path: '',
    component: AudioTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioTrainingPageRoutingModule {}
