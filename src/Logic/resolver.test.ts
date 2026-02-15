import { ALL_DATA, getSettings } from "./resolver";
import { describe, test, expect } from "vitest";
import type { Settings } from "./types"
import { JsonType } from "./json";


describe("resolver", () => {
  ALL_DATA.forEach((setting: Settings): void => {
    test(`${setting.language} should return correct type`, () => {
      expect(getSettings(setting.language)).toBe(setting)
    })
  })

  test("not found language should return default", () => {
    expect(getSettings("not found")).toBe(JsonType)
  })
})

