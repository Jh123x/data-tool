import { TsvType } from "./tsv";
import { describe, test, expect } from "vitest";

describe("TsvType - edge cases", () => {
  test("parses and stringifies simple TSV (success case)", () => {
    const input = '"name"\t"age"\r\n"Alice"\t"30"\r\n"Bob"\t"25"';
    const [data, errMsg] = TsvType.fromType(input);

    expect(errMsg).toBe("");
    expect(data).toEqual([
      { name: "Alice", age: "30" },
      { name: "Bob", age: "25" },
    ]);

    const out = TsvType.toType(data);
    // toType should produce a TSV equivalent to the input (same header order)
    expect(out).toBe(input);
  });

  test("empty input returns empty array and toType of empty data returns empty string", () => {
    const empty = "";
    const [parsed, errMsg] = TsvType.fromType(empty);
    expect(parsed).toEqual([]);
    expect(errMsg).toBe("");

    expect(TsvType.toType([])).toBe("");
  });

  test("header only (no rows) returns empty array", () => {
    const input = "col1\tcol2";
    const [parsed, errMsg] = TsvType.fromType(input);
    expect(parsed).toEqual([]);
    expect(errMsg).toBe("");
  });

  test("failure/error case: calling fromType with non-string (undefined) should throw", () => {
    // fromType expects a string; passing undefined should result in an error
    // Use ts-ignore to bypass TypeScript compile-time checks in the test
    // @ts-ignore
    expect(() => TsvType.fromType(undefined)).toThrow();
  });

  test("behaviour with invalid format: unterminated quoted field containing tabs", () => {
    // Header has two columns, but the data row begins a quoted field containing tabs and never closes the quote
    const input = 'col1\tcol2\n"a\tb\tc';
    const [parsed, errMsg] = TsvType.fromType(input);

    expect(parsed).toStrictEqual([]);
    expect(errMsg).toBe("Quoted field unterminated\nToo few fields: expected 2 fields but parsed 1");
  });

  test("escapes: fields with newlines, tabs, and quotes roundtrip", () => {
    const original = [
      {
        a: "line1\nline2",
        b: "has\ttab",
        c: 'quote " inside',
        d: "normal",
      },
    ];

    const tsv = TsvType.toType(original);

    // Quoting should have been applied to a and b and c should have doubled quotes
    expect(tsv.includes('"line1\nline2"')).toBe(true);
    expect(tsv.includes('"has\ttab"')).toBe(true);
    // c's internal quote should be doubled in the output
    expect(tsv.includes('"" inside')).toBe(true);

    const [parsed, errMsg] = TsvType.fromType(tsv);
    expect(parsed.length).toBe(1);
    expect(parsed[0].a).toBe(original[0].a);
    expect(parsed[0].b).toBe(original[0].b);
    expect(parsed[0].c).toBe(original[0].c);
    expect(parsed[0].d).toBe(original[0].d);
    expect(errMsg).toBe("");
  });

  test("handles CRLF line endings (\\r\\n) correctly", () => {
    const input = "h1\th2\r\nv1\tv2\r\n";
    // fromType should handle CRLF as line breaks
    const [parsed, errMsg] = TsvType.fromType(input);
    expect(parsed).toEqual([{ h1: "v1", h2: "v2" }]);
    expect(errMsg).toBe("");
  });

  test("handles trailing empty fields and multiple consecutive tabs", () => {
    // header has 4 columns; row provides values and empty fields in between and at end
    const input = "a\tb\tc\td\n1\t\t3\t\n";
    const [parsed, errMsg] = TsvType.fromType(input);
    // b is empty string, d is empty string (trailing empty field preserved)
    expect(parsed).toEqual([{ a: "1", b: "", c: "3", d: "" }]);
    expect(errMsg).toBe("");
  });

  test("toType treats null and undefined as empty fields and parsing yields empty strings", () => {
    const data = [{ x: null, y: undefined, z: "ok" }];
    const tsv = TsvType.toType(data);

    // Both null and undefined should produce empty columns
    expect(tsv).toContain("\t\t");
    const [parsed, errMsg] = TsvType.fromType(tsv);
    expect(parsed).toEqual([{ x: "", y: "", z: "ok" }]);
    expect(errMsg).toBe("");
  });

  test("Prettify trims trailing whitespace/tabs and normalizes CRLF to LF", () => {
    const input = "col1\tcol2\r\nval1 \tval2\t \r\n";
    const pretty = TsvType.Prettify(input);
    // Trailing whitespace/tabs trimmed from lines; check that the second line does not end with spaces/tabs
    const lines = pretty.split("\n");
    expect(lines[1].endsWith(" ") || lines[1].endsWith("\t")).toBe(false);
  });

  test("large field with many characters including tabs and newlines roundtrips", () => {
    const big = "a".repeat(5000) + '\nline\nwith\ttabs"and"quotes';
    const data = [{ big }];
    const tsv = TsvType.toType(data);
    const [parsed, errMsg] = TsvType.fromType(tsv);
    expect(parsed[0].big).toBe(big);
    expect(errMsg).toBe("");
  });
});
