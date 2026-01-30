// Security and robustness constants
export const DANGEROUS_KEYS = new Set([
  "__proto__",
  "prototype",
  "constructor",
]);
export const SPREADSHEET_DANGEROUS_START = /^[=+\-@]/;

