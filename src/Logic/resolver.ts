import { CsvType } from "./csv";
import { JsonType } from "./json";
import { TsvType } from "./tsv";
import { Settings } from "./types";

const ALL_DATA: Settings[] = [JsonType, TsvType, CsvType];

export const getSettings = (res: string): Settings => {
  for (const curr of ALL_DATA) {
    if (res === curr.language) return curr;
  }

  return ALL_DATA[0];
};
