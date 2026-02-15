import { CSV_EXAMPLE, TSV_EXAMPLE, JSON_EXAMPLE } from "./examples";
import { describe, test, expect } from "vitest";
import { detectFormat } from "./auto_detect_format";
import { CsvType } from "./csv";
import { TsvType } from "./tsv";
import { JsonType } from "./json";

describe("csv example", () => {
  test("should be detected as CSV", () => {
    expect(detectFormat(CSV_EXAMPLE)).toBe(CsvType);
  });
  test("should be parsed as CSV correctly", () => {
    const [ir, errMsg] = CsvType.fromType(CSV_EXAMPLE);
    expect(errMsg).toBe("");
    expect(ir).not.toBe([]);
  });
})

describe("tsv example", () => {
  test("should be detected as TSV", () => {
    expect(detectFormat(TSV_EXAMPLE)).toBe(TsvType);
  });
  test("should be parsed as TSV correctly", () => {
    const [ir, errMsg] = TsvType.fromType(TSV_EXAMPLE);
    expect(errMsg).toBe("");
    expect(ir).not.toBe([]);
  });
})

describe("json example", () => {
  test("should be detected as JSON", () => {
    expect(detectFormat(JSON_EXAMPLE)).toBe(JsonType);
  });
  test("should be parsed as JSON correctly", () => {
    const [ir, errMsg] = JsonType.fromType(JSON_EXAMPLE);
    expect(errMsg).toBe("");
    expect(ir).not.toBe([]);
  })
})

