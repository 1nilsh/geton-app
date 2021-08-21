export interface JournalEntry {
  id?: number;
  training: number;
  date: Date;
  scoreWohlfuehlen: number;
  scoreWohlwollen: number;
  scoreAchtsamkeit: number;
  text: string;
  status?: string; // Todo: Make enum
}
