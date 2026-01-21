import type { ValueType } from "./types";

export default class IR {
  public readonly headers: Array<string>;
  public readonly data: Array<Array<ValueType>>;

  constructor(header: Array<string>, data: Array<Array<ValueType>>) {
    this.headers = header
    this.data = data
  }

  getHeaders(): Array<string> {
    return this.headers;
  }
}
