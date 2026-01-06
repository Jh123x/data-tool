import { type Data, SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";
import * as CSV from "csv-string";

export const TsvType: Settings = {
  language: SupportedLanguage.tsv,
  Prettify: (code: string): string => {
    return code;
  },
  fromType: (code: string): Data => {
    return CSV.parse(code, "\t");
  },
  toType: (data: Data): string => {
    return CSV.stringify(data, "\t");
  },
};
