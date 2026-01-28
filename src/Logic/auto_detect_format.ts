import { CsvType } from "./csv";
import { JsonType } from "./json";
import { TsvType } from "./tsv";
import { Settings } from "./types";


export const detectFormat = (code: string): Settings => {
  // Max of O(n) with low constant factor to parse large files
  // Ideally O(1)
  if (code.startsWith("[")) return JsonType;
  if (code.includes("\t")) return TsvType;
  return CsvType;
};
