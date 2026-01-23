import type { Data, Result } from "../Components/types";
import { SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";
import { parse, unparse } from "papaparse";

export const CsvType: Settings = {
  language: SupportedLanguage.csv,
  Prettify: (code: string): string => {
    return code;
  },
  fromType: (code: string): Result => {
    const { data, errors } = parse(code, {
      delimiter: ",",
      header: true,
      skipEmptyLines: true,
    });
    return [data as Data, errors.map((x) => x.message).join("\n")];
  },
  toType: (ir: Data): string => {
    if (!Array.isArray(ir))
      throw new TypeError("toType expects an array of objects");
    if (ir.length === 0) return "";

    const { data } = unparse(ir, {
      quotes: true,
      delimiter: ",",
      header: true,
    });

    return data as string;
  },
};
