import type { Data, Result } from "../Components/types";
import { SupportedLanguage } from "../Components/types";
import type { Settings } from "./types";
import { SPREADSHEET_DANGEROUS_START, DANGEROUS_KEYS } from "./consts";

/**
 * Parse CSV text into array-of-rows (string[][]).
 */
function parseCSV(input: string): string[][] {
  if (input.length === 0) return [];

  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (inQuotes) {
      if (ch === '"') {
        // Escaped quote if next is also a quote
        if (input[i + 1] === '"') {
          field += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false; // closing quote
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(field);
        field = "";
      } else if (ch === "\n") {
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
      } else if (ch === "\r") {
        // Handle CR or CRLF
        if (input[i + 1] === "\n") {
          i++; // consume LF as part of CRLF
        }
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
      } else {
        field += ch;
      }
    }
  }

  // Tolerant behavior: if still in quotes at EOF, treat as if closed.
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

/**
 * Stringify rows (array-of-arrays) into CSV text.
 * Validates shape, sanitizes spreadsheet-dangerous leading characters, and escapes quotes.
 */
function stringifyCSV(rows: unknown): string {
  if (!Array.isArray(rows))
    throw new TypeError("stringifyCSV expects an array of rows");
  const outRows: string[] = [];

  for (const row of rows) {
    if (!Array.isArray(row))
      throw new TypeError("Each CSV row must be an array");
    const outFields: string[] = [];
    for (const raw of row) {
      const v = raw == null ? "" : String(raw);
      // Sanitize spreadsheet-dangerous starts to avoid CSV/TSV injection when opened in spreadsheets
      const safeVal = SPREADSHEET_DANGEROUS_START.test(v) ? `'${v}` : v;
      // If field contains tab, newline, CR, or double quote, quote it and escape internal quotes
      if (
        safeVal.includes(",") ||
        safeVal.includes("\n") ||
        safeVal.includes("\r") ||
        safeVal.includes('"')
      ) {
        const escaped = safeVal.replace(/"/g, '""');
        outFields.push('"' + escaped + '"');
      } else {
        outFields.push(safeVal);
      }
    }
    outRows.push(outFields.join(","));
  }

  return outRows.join("\n");
}

export const CsvType: Settings = {
  language: SupportedLanguage.csv,
  Prettify: (code: string): string => {
    return code;
  },
  fromType: (code: string): Result => {
    // parseCSV expects a string-like input; provide validated input to avoid internal swallowing
    const result = parseCSV(code);

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

    return stringifyCSV(rows);
  },
};
