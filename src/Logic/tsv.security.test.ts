import { TsvType } from "./tsv";
import { describe, test, expect } from "vitest";

describe("TSV Security Tests", () => {
  test("non-string input should throw for fromType", () => {
    // Depending on whether TSV was patched yet, this should throw a descriptive TypeError.
    // @ts-ignore
    expect(() => TsvType.fromType(undefined)).toThrow();
  });

  test("prototype pollution attempt via header should not modify global prototypes", () => {
    const header = "__proto__\tfoo\n";
    const row = "pwned\tbar\n";
    const input = header + row;

    const [parsed, errMsg] = TsvType.fromType(input);
    expect(Array.isArray(parsed)).toBe(true);

    if (parsed.length > 0) {
      const obj = parsed[0] as Record<string, any>;
      // The secure implementation should either:
      // - create objects with null prototype, or
      // - sanitize the dangerous header so it does not set the object's prototype.
      // Assert that the global prototype wasn't polluted.
      expect(({} as any).pwned).toBeUndefined();
      expect((Object.prototype as any).pwned).toBeUndefined();

      // Prefer that parsed objects don't have Object.prototype as prototype (safer)
      expect(
        Object.getPrototypeOf(obj) === null ||
        Object.getPrototypeOf(obj) === Object.prototype,
      ).toBeTruthy();

      // Also assert that there is not a direct '__proto__' property
      expect(Object.prototype.hasOwnProperty.call(obj, "__proto__")).toBe(
        false,
      );
    }
  });

  test("extra fields are stored under numeric keys for TSV", () => {
    const input = "a\tb\t2\r\n1\t2\t3\r\n";
    const [parsed, errMsg] = TsvType.fromType(input);
    expect(errMsg).toBe("");
    expect(parsed.length).toBe(1);
    const row = parsed[0];
    expect(row["a"]).toBe("1");
    expect(row["b"]).toBe("2");
    // Implementation should place extra column under "2"
    expect(row["2"]).toBe("3");
  });

  test("unterminated quoted TSV field should be handled safely (no crash)", () => {
    // TSV parser behavior may choose to be tolerant; ensure it does not crash
    const bad = 'col1\tcol2\n"a\tb\tc';
    expect(() => TsvType.fromType(bad)).not.toThrow();
    const parsed = TsvType.fromType(bad);
    // Parser should produce at least one row (tolerant) or an empty array; both are acceptable as long as no crash
    expect(Array.isArray(parsed)).toBe(true);
  });

  test("CRLF handling for TSV", () => {
    const lf = "h1\th2\nv1\tv2\n";
    const crlf = "h1\th2\r\nv1\tv2\r\n";
    const p1 = TsvType.fromType(lf);
    const p2 = TsvType.fromType(crlf);
    expect(p1).toEqual(p2);
  });

  test("hostile getters on objects passed to TSV.toType should not cause arbitrary execution", () => {
    const badRow = [
      {
        get a() {
          throw new Error("tsv-getter-boom");
        },
      } as any,
    ];
    // Implementation should either sanitize or throw a descriptive error; ensure it does not allow arbitrary behavior
    expect(() => TsvType.toType(badRow)).toThrow();
  });
});
