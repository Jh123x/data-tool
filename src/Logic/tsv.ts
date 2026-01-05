import { SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";

export const TsvType: Settings = {
  language: SupportedLanguage.tsv,
  Prettify: (code: string): string => {
    return code;
  },
};
