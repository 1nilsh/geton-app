import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingTileComponent } from './component/training-tile/training-tile.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TrainingPlaceholderComponent } from './component/training-placeholder/training-placeholder.component';


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
