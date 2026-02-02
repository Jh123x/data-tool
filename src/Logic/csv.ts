import type { Data, Result } from "../Components/types";
import { SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";
import { DANGEROUS_KEYS, SPREADSHEET_DANGEROUS_START } from "./consts";
import { parseSV, stringifySV } from "./format_helper";
import { CSV_EXAMPLE } from "./examples";



export const CsvType: Settings = {
  language: SupportedLanguage.csv,
  Prettify: (code: string): string => code,
  getSample: (): string => CSV_EXAMPLE,
  fromType: (code: string): Result => {
    const result = parseSV(code, ",");

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

    return stringifySV(rows, ",");
  },
};
