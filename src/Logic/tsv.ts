import type { Data, Result } from "../Components/types";
import { SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";
import { TSV_EXAMPLE } from "./examples";
import { parse, unparse } from "papaparse";

const importTSVSettings = {
  delimiter: "\t",
  header: true,
  skipEmptyLines: true,
};

const exportTSVSettings = {
  delimiter: "\t",
  header: true,
};

export const TsvType: Settings = {
  language: SupportedLanguage.tsv,
  Prettify: (code: string): string => code,
  getSample: (): string => TSV_EXAMPLE,
  fromType: (code: string): Result => {
    const { data, errors } = parse(code, importTSVSettings);
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

    const data = unparse(ir, exportTSVSettings);
    return data as string;
  },
};
