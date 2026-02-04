import type { Data, Result } from "../Components/types";
import { SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";
import { CSV_EXAMPLE } from "./examples";
import { parse, unparse } from "papaparse";

const csvImportCSVSettings = {
  delimiter: ",",
  header: true,
  skipEmptyLines: true,
};

const exportCSVSettings = {
  delimiter: ",",
  header: true,
};

export const CsvType: Settings = {
  language: SupportedLanguage.csv,
  Prettify: (code: string): string => code,
  getSample: (): string => CSV_EXAMPLE,
  fromType: (code: string): Result => {
    const { data, errors } = parse(code, csvImportCSVSettings);
    const errMsg = errors
      .map((x) => x.message)
      .slice(0, 10)
      .join("\n");
    if (errMsg.length > 0) return [[], errMsg];
    return [data as Data, ""];
  },
  toType: (ir: Data): string => {
    if (!Array.isArray(ir))
      throw new TypeError("toType expects an array of objects");
    if (ir.length === 0) return "";

    const data = unparse(ir, exportCSVSettings);
    return data as string;
  },
};
