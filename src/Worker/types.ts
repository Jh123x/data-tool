import type { SupportedLanguage } from "../Components/types";

export interface MessageData {
  fromType: SupportedLanguage;
  data: string;
}
