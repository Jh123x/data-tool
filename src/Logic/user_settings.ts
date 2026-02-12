import { JsonType } from "./json";

export interface UserSettings {
  isAutoDetect: boolean;
  fromLang: string;
  toLang: string;
}

export const SerializeSettings = (settings: UserSettings): string => {
  const rawSettings = JSON.stringify(settings);
  return rawSettings;
};

export const ParseSettings = (rawSettings: string): UserSettings => {
  const userSettings: UserSettings = {
    isAutoDetect: false,
    fromLang: JsonType.language,
    toLang: JsonType.language,
  };

  if (rawSettings.length === 0) return userSettings;

  try {
    const settings: UserSettings = JSON.parse(rawSettings);
    if (!settings) return userSettings;
    if (!!settings?.isAutoDetect)
      userSettings.isAutoDetect = Boolean(settings.isAutoDetect);
    if (!!settings?.fromLang) userSettings.fromLang = settings.fromLang;
    if (!!settings?.toLang) userSettings.toLang = settings.toLang;
  } catch (e) {
    console.warn("unable to load user settings, fallback to default:", String(e));
  }

  return userSettings;
};
