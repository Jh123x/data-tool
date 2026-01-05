import type { SupportedLanguage } from "../Components/types";

export interface Settings {
  language: SupportedLanguage;
  Prettify: (code: string) => string;
}
