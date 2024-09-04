export interface DiaryEntry {
  id: number;
  date: string;
  comment: string;
  weather: string;
  visibility: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
