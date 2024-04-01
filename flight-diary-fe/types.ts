// enum Weather {
//   rainy = "rainy",
//   sunny = "sunny",
//   windy = "windy",
//   cloudy = "cloudy",
// }

// enum Visibility {
//   poor = "poor",
//   good = "good",
// }

export interface IDiary {
  id: number;
  date: string;
  weather: string;
  comment: string;
  visibility: string;
}

export type TNewDiary = Omit<IDiary, "id">;

export type ErrorDiary = {
  [K in keyof TNewDiary]: string;
};
