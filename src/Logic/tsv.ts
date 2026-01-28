import type { Data, Result } from "../Components/types";
import { SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";
import { parse, unparse } from "papaparse";
import { l } from "@vitest/runner/dist/tasks.d-C7UxawJ9";

export const TsvType: Settings = {
  language: SupportedLanguage.tsv,

  Prettify: (code: string): string => {
    return code;
  },

  fromType: (code: string): Result => {
    const { data, errors } = parse(code, {
      delimiter: "\t",
      header: true,
      skipEmptyLines: true,
    });
    const errMsg = errors.map((x) => x.message).join("\n")
    if (errMsg.length > 0) return [[], errMsg]
    return [data as Data, ""];
  },

  toType: (ir: Data): string => {
    if (!Array.isArray(ir))
      throw new TypeError("toType expects an array of objects");
    if (ir.length === 0) return "";

    const data = unparse(ir, {
      quotes: true,
      delimiter: "\t",
      header: true,
    });

    return data as string;
  },
};
