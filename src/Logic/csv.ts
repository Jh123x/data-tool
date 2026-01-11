import type { Data, Result } from "../Components/types";
import { SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";
import { parse, stringify } from "@vanillaes/csv";

export const CsvType: Settings = {
  language: SupportedLanguage.csv,
  Prettify: (code: string): string => {
    return code;
  },
  fromType: (code: string): Result => {
    const result = parse(code);
    if (result.length === 0) return [[], ""];
    const header = result[0];
    const finalResult: Data = [];

    for (let rowIdx = 1; rowIdx < result.length; rowIdx++) {
      const row = result[rowIdx];
      let obj: Record<string, Array<string>> = {};
      for (let i = 0; i < header.length; i++) {
        obj[header[i]] = row[i];
      }
      finalResult.push(obj);
    }
    return [finalResult, ""];
  },
  toType: (data: Data): string => {
    if (data.length === 0) return "";

    const headers = [];
    for (const k of Object.keys(data[0])) {
      if (k in headers) continue;
      headers.push(k);
    }

    console.log(headers);

    const results = [headers];

    for (const obj of data) {
      const row = headers.map((headerVal: string) => obj[headerVal]);
      results.push(row);
    }

    return stringify(results);
  },
};
