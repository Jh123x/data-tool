import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { LanguageDropdown } from "./Dropdown";

describe("Dropdown", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(
      <LanguageDropdown
        label={"test"}
        currSelection={"test"}
        setSelectedOption={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
