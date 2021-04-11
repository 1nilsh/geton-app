import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingTileComponent } from './training-tile/training-tile.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TrainingPlaceholderComponent } from './training-placeholder/training-placeholder.component';


@NgModule({
  declarations: [
    TrainingTileComponent,
    TrainingPlaceholderComponent
  ],
  exports: [
    TrainingTileComponent,
    TrainingPlaceholderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class TrainingModule {
}
