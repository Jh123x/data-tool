import { SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";

export const CsvType: Settings = {
  language: SupportedLanguage.csv,
  Prettify: (code: string): string => {
    return code;
  },
};
