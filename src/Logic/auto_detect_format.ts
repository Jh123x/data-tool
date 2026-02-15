import { CsvType } from "./csv";
import { JsonType } from "./json";
import { TsvType } from "./tsv";
import type { Settings } from "./types";

export const detectFormat = (code: string): Settings => {
  if (code.startsWith("[")) return JsonType;
  if (code.includes("\t")) return TsvType;
  return CsvType;
};
