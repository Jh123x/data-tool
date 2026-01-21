import type { Data, Result, SupportedLanguage } from "../Components/types";

export interface Settings {
  language: SupportedLanguage;
  Prettify: (code: string) => string;
  fromType: (code: string) => Result;
  toType: (data: Data) => string;
}

export type ValueType = string | number | boolean;
