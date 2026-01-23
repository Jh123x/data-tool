import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from "./App";

describe("App", () => {
  test("should render correctly", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
