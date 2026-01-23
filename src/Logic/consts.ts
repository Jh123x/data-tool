// Security and robustness constants
export const MAX_INPUT_LENGTH = 100_000; // adjustable limit to mitigate DoS
export const DANGEROUS_KEYS = new Set([
  "__proto__",
  "prototype",
  "constructor",
]);
export const SPREADSHEET_DANGEROUS_START = /^[=+\-@]/;
