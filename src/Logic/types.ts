import type { Data, SupportedLanguage } from "../Components/types";

export interface Settings {
  language: SupportedLanguage;
  Prettify: (code: string) => string;
  fromType: (code: string) => Data;
  toType: (data: Data) => string;
}
