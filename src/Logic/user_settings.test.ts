import { describe, test, expect } from "vitest";
import { CsvType } from "./csv";
import { JsonType } from "./json";
import { TsvType } from "./tsv";
import { type UserSettings, ParseSettings, SerializeSettings } from "./user_settings";

describe("User Settings", () => {
  test("should serialize and unserialize correctly", () => {
    const userSettings: UserSettings = {
      isAutoDetect: true,
      toLang: JsonType.language,
      fromLang: CsvType.language,
    };
    expect(ParseSettings(SerializeSettings(userSettings))).toEqual(userSettings)
  });

  test("should drop unexpected keys", () => {
    const userSettings = {
      isAutoDetect: true,
      toLang: JsonType.language,
      fromLang: TsvType.language,
      others: "test",
      moreOthers: "test2",
    }

    expect(ParseSettings(SerializeSettings(userSettings))).toEqual({
      isAutoDetect: true,
      toLang: JsonType.language,
      fromLang: TsvType.language,
    });
  })
})

