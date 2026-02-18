import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { CopyFormat } from "./CopyFormat";
import useNotification from "antd/es/notification/useNotification";

const Wrapper = () => {
  const [api, contextHolder] = useNotification();
  return (
    <div>
      {contextHolder}
      <CopyFormat notificationAPI={api} irValue={[]} setValue={() => { }} setLang={() => { }} />
    </div>
  );
};

describe("CopyFormat", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(<Wrapper />);
    expect(asFragment()).toMatchSnapshot();
  });
});
