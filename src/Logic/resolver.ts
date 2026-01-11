import { CsvType } from "./csv";
import { JsonType } from "./json";
import { TsvType } from "./tsv";
import { Settings } from "./types";

export const ALL_DATA: Settings[] = [JsonType, CsvType, TsvType];

export const getSettings = (res: string): Settings => {
  for (const curr of ALL_DATA) {
    if (res === curr.language) return curr;
  }

  return ALL_DATA[0];
};
