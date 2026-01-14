import { CsvType } from "./csv";
import { JsonType } from "./json";
import { TsvType } from "./tsv";
import { Settings } from "./types";


export const detectFormat = (code: string): Settings => {
  if (code.startsWith('[')) return JsonType
  if (code.split("\t").length > 2) return TsvType;
  return CsvType
}
