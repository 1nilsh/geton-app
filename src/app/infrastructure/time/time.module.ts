import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SToHmsPipe } from '@app/infrastructure/time/pipes/s-to-hms.pipe';


@NgModule({
  declarations: [SToHmsPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SToHmsPipe
  ]
})
export class TimeModule {
}
