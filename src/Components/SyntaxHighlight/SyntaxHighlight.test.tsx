import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import SyntaxHighlight from "./SyntaxHighlight";
import { SupportedLanguage } from "../types";


describe("SyntaxHighlight", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(<SyntaxHighlight results={'[{"test":"test2","test2":"test3"}]'} language={SupportedLanguage.json} />);
    expect(asFragment()).toMatchSnapshot();
  })
})


