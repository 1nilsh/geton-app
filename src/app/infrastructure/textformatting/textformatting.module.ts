import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreformattedTextPipe } from '@app/infrastructure/textformatting/pipes/preformatted-text.pipe';



@NgModule({
  declarations: [PreformattedTextPipe],
  imports: [
    CommonModule
  ],
  exports: [PreformattedTextPipe]
})
export class TextformattingModule { }
