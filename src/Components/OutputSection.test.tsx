import { render } from "@testing-library/react";
import useNotification from "antd/es/notification/useNotification";
import { describe, expect, test } from "vitest";
import { JsonType } from "../Logic/json";
import type { Settings } from "../Logic/types";
import { OutputSection } from "./OutputSection";



const WrapperComponent = () => {
  const [api, contextHolder] = useNotification();
  return (
    <div>
      {contextHolder}
      <OutputSection
        toLang={JsonType}
        irValue={[]}
        setValue={(_: string) => { }}
        setFromLang={(_: Settings) => { }}
        api={api}
      />
    </div>
  );
};

describe("Loading", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(<WrapperComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});

