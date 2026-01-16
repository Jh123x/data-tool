import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { InputField } from "./InputField";


describe("Dropdown", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(<div><InputField /></div>);
    expect(asFragment()).toMatchSnapshot();
  })
})
