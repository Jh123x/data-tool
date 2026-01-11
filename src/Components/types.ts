export enum SupportedLanguage {
  json = "json",
  tsv = "tsv",
  csv = "csv",
}

export type ErrorMsg = string;
export type Data = Array<Record<string, any>>;
export type Result = [Data, ErrorMsg];

export type NotificationType = "success" | "info" | "warning" | "error";
