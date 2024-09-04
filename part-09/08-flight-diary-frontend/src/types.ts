export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface DiaryEntry {
  id: number;
  date: string;
  comment: string;
  weather: string;
  visibility: string;
}

export enum Weather {
  SUNNY = 'sunny',
  CLOUDY = 'cloudy',
  RAINY = 'rainy',
  STORMY = 'stormy',
  WINDY = 'windy'
}

export enum Visibility {
  GREAT = 'great',
  GOOD = 'good',
  OK = 'ok',
  POOR = 'poor'
}
