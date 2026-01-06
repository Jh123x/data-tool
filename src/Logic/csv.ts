import { type Data, SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";
import * as CSV from "csv-string";

export const CsvType: Settings = {
  language: SupportedLanguage.csv,
  Prettify: (code: string): string => {
    return code;
  },
  fromType: (code: string): Data => {
    return CSV.parse(code, ",");
  },
  toType: (data: Data): string => {
    return CSV.stringify(data, ",");
  },
};
