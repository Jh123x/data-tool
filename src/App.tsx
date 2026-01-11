import React, { useEffect, useState } from "react";
import { CodeEditor } from "./Components/CodeEditor";
import { LanguageDropdown } from "./Components/Dropdown";
import { InputField } from "./Components/InputField";
import { JsonType } from "./Logic/json";
import { getSettings } from "./Logic/resolver";
import { Settings } from "./Logic/types";
import { PageTitle } from "./Components/PageTitle";
import { CopyFormat } from "./Components/CopyFormat";
import { notification, Typography } from "antd";
import { setIsCopiedFactory } from "./Components/Copy";

const App = () => {
  const [api, contextHolder] = notification.useNotification();
  const [value, setValue] = useState<string>("");
  const [fromLang, setFromLang] = useState<Settings>(JsonType);
  const [toLang, setToLang] = useState<Settings>(JsonType);
  const [targetValue, setTargetValue] = useState<string>("");
  const setNotification = setIsCopiedFactory(api);

  useEffect(() => {
    if (value === "") {
      setTargetValue("");
      return;
    }

    const [tmp, errMsg] = fromLang.fromType(value);
    if ((errMsg ?? "") !== "") {
      setNotification({
        type: "error",
        title: "Error Format",
        message: errMsg,
      });
      return;
    }
    const finalValue = toLang.toType(tmp);
    setTargetValue(finalValue);
  }, [value, fromLang, toLang, setNotification]);
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
        setOption={(res) => setFromLang(getSettings(res))}
      />
      <InputField placeholder="Input Data" setValue={setValue} />
      <LanguageDropdown
        label="To Format"
        currSelection={toLang.language}
        setOption={(res) => setToLang(getSettings(res))}
      />
      <Typography>To Format</Typography>
      <CopyFormat
        fromLang={fromLang}
        value={value}
        setNotification={setNotification}
      />
      <CodeEditor languageSetting={toLang} value={targetValue} />
    </>
  );
};

export default App;
