import { ShjLanguage } from '@speed-highlight/core/index';
import { SupportedLanguage } from '../Components/types';

export const convertToShjLang = (currLang: SupportedLanguage): ShjLanguage => {
  switch (currLang) {
    case SupportedLanguage.csv: return "csv"
    case SupportedLanguage.tsv: return "csv"
    case SupportedLanguage.json: return "json"
    default: return "csv"
  }
}
