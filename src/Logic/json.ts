import { Data, SupportedLanguage } from "../Components/types";
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
  fromType: (code: string): Data => {
    return JSON.parse(code);
  },
  toType: (data: Data): string => {
    return JSON.stringify(data);
  },
};
