import {
  ParseSettings,
  SerializeSettings,
  type UserSettings,
} from "./user_settings";

const ValueKey = "settings";

export const GetSettings = (): UserSettings => {
  const rawSettings = localStorage.getItem(ValueKey) ?? "";
  return ParseSettings(rawSettings);
};

export const SetSettings = (userSettings: UserSettings): void => {
  const rawSettings = SerializeSettings(userSettings);
  localStorage.setItem(ValueKey, rawSettings);
};
