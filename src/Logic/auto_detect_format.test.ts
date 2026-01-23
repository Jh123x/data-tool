import { describe, expect, test } from "vitest";
import { detectFormat } from "./auto_detect_format";
import { CsvType } from "./csv";
import { JsonType } from "./json";
import { TsvType } from "./tsv";

describe("auto detect format", () => {
  test("should detect as json", () => {
    const result = detectFormat("[]");
    expect(result).toEqual(JsonType);
  });
  test("should detect as csv", () => {
    const result = detectFormat("1,2,3\n,1,2,3");
    expect(result).toEqual(CsvType);
  });
  test("should detect as tsv", () => {
    const result = detectFormat("1\t2\t3\n1\t2\t2\t3");
    expect(result).toEqual(TsvType);
  });
});
