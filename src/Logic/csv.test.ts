import { describe, expect, test } from "vitest";
import { CsvType } from "./csv";

describe("csv", () => {
  describe("fromType and toType should return same", () => {
    const tests: Array<string> = [
      "f1,f2,f3\ncsv,tsv,json",
      "test1,test2,test3\ntest,test,test",
    ];

    for (const testStr of tests) {
      test(testStr, () => {
        const [data, errMsg] = CsvType.fromType(testStr);
        expect(errMsg).toEqual("");
        expect(CsvType.toType(data)).toEqual(testStr);
      });
    }
  });
});
