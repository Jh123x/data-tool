import React, { Suspense, useEffect, useState } from "react";
import { LanguageDropdown } from "./Components/Dropdown";
import { InputField } from "./Components/InputField";
import { JsonType } from "./Logic/json";
import { getSettings } from "./Logic/resolver";
import { Settings } from "./Logic/types";
import { PageTitle } from "./Components/PageTitle";
import { CopyFormat } from "./Components/CopyFormat";
import { Button, notification, Row, Typography } from "antd";
import type { Data } from "./Components/types";
import { detectFormat } from "./Logic/auto_detect_format";
import { Loading } from "./Components/Loading";

const App = () => {
  const [api, contextHolder] = notification.useNotification();
  const [value, setValue] = useState<string>("");
  const [fromLang, setFromLang] = useState<Settings>(JsonType);
  const [toLang, setToLang] = useState<Settings>(JsonType);
  const [ir, setIR] = useState<Data>([]);
  const [isAutoDetect, setAutoDetect] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoDetect) return;
    const detectedSettings = detectFormat(value);
    setFromLang(detectedSettings);
  }, [isAutoDetect, value])

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
      <Row>
        <LanguageDropdown
          label="From Format"
          currSelection={fromLang.language}
          disabled={isAutoDetect}
          setSelectedOption={(res) => setFromLang(getSettings(res))}
        />
        <Button
          onClick={() => {
            setAutoDetect(!isAutoDetect)
          }}
        >
          Toggle Autodetect
        </Button>
      </Row>
      <InputField placeholder="Input Data" setValue={setValue} />
      <LanguageDropdown
        label="To Format"
        currSelection={toLang.language}
        setSelectedOption={(res) => setToLang(getSettings(res))}
      />
      <Typography>To Format</Typography>
      <CopyFormat fromLang={fromLang} value={value} notificationAPI={api} />
      <Suspense fallback={<Loading />}>
        <CodeEditorComponent fromLang={fromLang} value={value} toLang={toLang} irValue={ir} notificationAPI={api} />
      </Suspense>
    </>
  );
};

export default App;
