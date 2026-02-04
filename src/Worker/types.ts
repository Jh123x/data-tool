import type { Data, SupportedLanguage } from "../Components/types";

export interface MessageData {
  fromType: SupportedLanguage;
  data: string;
}

export interface ResultData {
  toType: SupportedLanguage;
  data: Data;
}
