import type { Data, Result } from "../Components/types";
import { SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";
import { SPREADSHEET_DANGEROUS_START, DANGEROUS_KEYS } from "./consts";
import { parseSV, stringifySV } from "./format_helper";
import { TSV_EXAMPLE } from "./examples";

/**
 * Ensure the input is a string and within allowed size.
 * Throws descriptive errors on invalid input to avoid unexpected TypeErrors.
 */
function ensureStringInput(input: unknown, name = "input"): string {
  if (input == null) throw new TypeError(`${name} must be a string`);
  if (typeof input !== "string")
    throw new TypeError(`${name} must be a string`);
  return input;
}

export const TsvType: Settings = {
  language: SupportedLanguage.tsv,

  Prettify: (code: string): string => {
    try {
      const input = ensureStringInput(code, "code");
      // Normalize CRLF -> LF, trim trailing whitespace/tabs per line
      return input
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((ln) => ln.replace(/[ \t]+$/g, ""))
        .join("\n");
    } catch {
      return code;
    }
  },
  getSample: (): string => TSV_EXAMPLE,

  fromType: (code: unknown): Result => {
    // Validate input first so invalid types cause a clear exception (instead of being swallowed)
    const input = ensureStringInput(code, "code");
    // parseTSV expects a string-like input; provide validated input to avoid internal swallowing
    const result = parseSV(input, "\t");

    if (!Array.isArray(result) || result.length === 0) return [[], ""];

    const headerRaw = result[0] ?? [];
    const header: string[] = headerRaw.map((h) => {
      const key = String(h ?? "");
      return DANGEROUS_KEYS.has(key) ? `_${key}` : key;
    });

    const finalResult: Data = [];
    for (let rowIdx = 1; rowIdx < result.length; rowIdx++) {
      const row = result[rowIdx] ?? [];
      // Use object with null prototype to avoid prototype pollution
      const obj: Record<string, any> = Object.create(null);

      // Map header columns
      for (let i = 0; i < header.length; i++) {
        const key = header[i] ?? "";
        obj[key] = row[i] ?? "";
      }
      // Extra columns (more fields than headers) are placed under numeric-string keys
      for (let i = header.length; i < row.length; i++) {
        obj[String(i)] = row[i];
      }
      finalResult.push(obj);
    }
    return [finalResult, ""];
  },

  toType: (data: Data): string => {
    if (!Array.isArray(data))
      throw new TypeError("toType expects an array of objects");
    if (data.length === 0) return "";

    // Collect headers preserving insertion order and deduplicating
    const headers: string[] = [];
    for (const obj of data) {
      if (
        obj == null ||
        Object.prototype.toString.call(obj) !== "[object Object]"
      )
        continue;
      for (const k of Object.keys(obj)) {
        if (headers.indexOf(k) !== -1) continue;
        headers.push(k);
      }
    }

    const rows: string[][] = [headers];
    for (const obj of data) {
      const row: string[] = [];
      for (const k of headers) {
        let v: string;
        try {
          v = obj[k];
        } catch (e) {
          // Fail with descriptive error when property access throws
          throw new Error(
            `Failed to read property "${k}" from row: ${(e as Error).message}`,
          );
        }
        if (v == null) v = "";
        const vs = String(v);
        // Sanitize spreadsheet-dangerous starts
        row.push(SPREADSHEET_DANGEROUS_START.test(vs) ? `'${vs}` : vs);
      }
      rows.push(row);
    }

    return stringifySV(rows, "\t");
  },
};
