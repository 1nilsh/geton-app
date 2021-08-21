import { AudioFeature } from './audio-feature';
import { JournalFeature } from './journal-feature';

export interface Features {
  audio?: AudioFeature;
  journal?: JournalFeature;
}
