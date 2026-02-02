import type { Data, Result } from "../Components/types";
import { SupportedLanguage } from "../Components/types";
import { JSON_EXAMPLE } from "./examples";
import type { Settings } from "./types";

export const JsonType: Settings = {
  language: SupportedLanguage.json,
  Prettify: (code: string): string => {
    try {
      return JSON.stringify(JSON.parse(code), null, 2);
    } catch {
      return code;
    }
  },
  getSample: (): string => JSON_EXAMPLE,
  fromType: (code: string): Result => {
    if (code.length === 0) return [[], ""];
    if (code[0] !== "[") {
      return [[], "Only JSON arrays are supported"];
    }

    try {
      const result = JSON.parse(code);
      if (!(result instanceof Array)) {
        return [[], "Only JSON arrays are supported"];
      }
      const headers = new Set<string>();
      for (const row of result) {
        for (const key of Object.keys(row)) headers.add(key)
      }

      return [result.map((obj) => {
        for (const k of headers.values()) {
          if (k in obj) continue
          obj[k] = ""
        }
        return obj
      }), ""];
    } catch (error) {
      return [[], String(error)];
    }
  },
  toType: (data: Data): string => {
    return JSON.stringify(data);
  },
};
