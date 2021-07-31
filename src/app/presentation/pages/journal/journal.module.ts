import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JournalPageRoutingModule } from './journal-routing.module';

import { JournalPage } from './journal.page';
import { TitlebarModule } from '@app/presentation/universal-components/titlebar/titlebar.module';
import { AddEntryModalComponent } from '@app/presentation/pages/journal/add-entry-modal/add-entry-modal.component';
import { IndicatorEmoticonComponent } from '@app/presentation/pages/journal/indicator-emoticon/indicator-emoticon.component';
import { ChartComponent } from '@app/presentation/pages/journal/chart/chart.component';
import { ReviewEntryModalComponent } from '@app/presentation/pages/journal/review-entry-modal/review-entry-modal.component';
import { TextformattingModule } from '@app/infrastructure/textformatting/textformatting.module';
import { IndicatorTextComponent } from '@app/presentation/pages/journal/indicator-text/indicator-text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JournalPageRoutingModule,
    TitlebarModule,
    TextformattingModule,
  ],
  declarations: [
    JournalPage,
    AddEntryModalComponent,
    ReviewEntryModalComponent,
    IndicatorEmoticonComponent,
    ChartComponent,
    IndicatorTextComponent
  ]
})
export class JournalPageModule {
}
