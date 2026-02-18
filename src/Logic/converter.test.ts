import { describe, expect, test } from "vitest";
import { SupportedLanguage } from "../Components/types";
import { convertToShjLang } from "./converter";

describe("Converter", () => {
  test(`json`, () => {
    expect(convertToShjLang(SupportedLanguage.json)).toBe(`json`)
  })

  test(`csv`, () => {
    expect(convertToShjLang(SupportedLanguage.csv)).toBe(`csv`)
  })

  test(`tsv`, () => {
    expect(convertToShjLang(SupportedLanguage.tsv)).toBe(`csv`)
  })
})

