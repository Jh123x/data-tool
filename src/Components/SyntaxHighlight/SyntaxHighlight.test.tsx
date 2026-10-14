import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import SyntaxHighlight from "./SyntaxHighlight";
import { SupportedLanguage } from "../types";
import { act } from "react";


describe("SyntaxHighlight", () => {
  test("should match snapshot", () => {
    act(() => {
      const { asFragment } = render(<SyntaxHighlight results={'[{"test":"test2","test2":"test3"}]'} language={SupportedLanguage.json} />);
      expect(asFragment()).toMatchSnapshot();
    })
  })
})


