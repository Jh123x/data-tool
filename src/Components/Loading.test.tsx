import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Loading } from "./Loading";

describe("Loading", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
