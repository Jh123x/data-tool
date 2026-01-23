import { SPREADSHEET_DANGEROUS_START } from "./consts";

/**
 * Parse CSV text into array-of-rows (string[][]).
 */
export function parseSV(input: string, delimiter: string): string[][] {
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
      } else if (ch === delimiter) {
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
export function stringifySV(rows: unknown, delimiter: string): string {
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
        safeVal.includes(delimiter) ||
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
    outRows.push(outFields.join(delimiter));
  }

  return outRows.join("\n");
}
