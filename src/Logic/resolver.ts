import { CsvType } from "./csv";
import { JsonType } from "./json";
import { TsvType } from "./tsv";
import type { Settings } from "./types";

export const ALL_DATA: Settings[] = [JsonType, CsvType, TsvType];
const allLanguageMap = new Map<string, Settings>(
  ALL_DATA.map((setting: Settings) => [setting.language, setting])
)

export const getSettings = (res: string): Settings => {
  return allLanguageMap.get(res) ?? ALL_DATA[0];
};
