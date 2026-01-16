import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PageTitle } from "./PageTitle";


describe("Page Title", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(<PageTitle title={"Test Title"} subText={"Test sub text"} />)
    expect(asFragment()).toMatchSnapshot()
  })
});
