import CodeEditor from "./CodeEditor"
import { test, describe, expect } from "vitest"
import { JsonType } from "../Logic/json"
import { render } from "@testing-library/react"
import useNotification from "antd/es/notification/useNotification"

const WrapperComponent = () => {
  const [api, contextHolder] = useNotification();
  return <div>
    {contextHolder}
    <CodeEditor
      irValue={JsonType.fromType("")[0]}
      value={""}
      toLang={JsonType}
      fromLang={JsonType}
      notificationAPI={api}
    />
  </div>
}

describe("CodeEditor", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(<WrapperComponent />)
    expect(asFragment()).toMatchSnapshot()
  })
})
