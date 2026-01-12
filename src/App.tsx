import React, { Suspense, useEffect, useState } from "react";
import { LanguageDropdown } from "./Components/Dropdown";
import { InputField } from "./Components/InputField";
import { JsonType } from "./Logic/json";
import { getSettings } from "./Logic/resolver";
import { Settings } from "./Logic/types";
import { PageTitle } from "./Components/PageTitle";
import { CopyFormat } from "./Components/CopyFormat";
import { notification, Typography } from "antd";
import type { Data } from "./Components/types";

const App = () => {
  const [api, contextHolder] = notification.useNotification();
  const [value, setValue] = useState<string>("");
  const [fromLang, setFromLang] = useState<Settings>(JsonType);
  const [toLang, setToLang] = useState<Settings>(JsonType);
  const [ir, setIR] = useState<Data>([]);

  useEffect(() => {
    if (value.length === 0) return;
    const [tmp, errMsg] = fromLang.fromType(value);

    if ((errMsg ?? "") !== "") {
      api.error({
        title: "Error Format",
        description: errMsg,
        duration: 2,
      });
      return;
    }

    setIR(tmp);
  }, [fromLang, value, api]);

  const CodeEditorComponent = React.lazy(
    () => import("./Components/CodeEditor"),
  );

  return (
    <>
      {contextHolder}
      <PageTitle
        title="Data Converter"
        subText="Convert data between different formats."
      />
      <Typography>To Format</Typography>
      <LanguageDropdown
        label="From Format"
        currSelection={fromLang.language}
        setSelectedOption={(res) => setFromLang(getSettings(res))}
      />
      <InputField placeholder="Input Data" setValue={setValue} />
      <LanguageDropdown
        label="To Format"
        currSelection={toLang.language}
        setSelectedOption={(res) => setToLang(getSettings(res))}
      />
      <Typography>To Format</Typography>
      <CopyFormat fromLang={fromLang} value={value} notificationAPI={api} />
      <Suspense fallback={<div>Loading....</div>}>
        <CodeEditorComponent fromLang={fromLang} value={value} toLang={toLang} irValue={ir} />
      </Suspense>
    </>
  );
};

export default App;
