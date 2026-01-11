import React, { useEffect, useState } from "react";
import { CodeEditor } from "./Components/CodeEditor";
import { CopyButton } from "./Components/CopyButton";
import { LanguageDropdown } from "./Components/Dropdown";
import { InputField } from "./Components/InputField";
import { JsonType } from "./Logic/json";
import { getSettings } from "./Logic/resolver";
import { Settings } from "./Logic/types";
import { PageTitle } from "./Components/PageTitle";
import { CopyFormat } from "./Components/CopyFormat";
import { Typography } from "antd";

const App = () => {
  const [value, setValue] = useState<string>("");
  const [fromLang, setFromLang] = useState<Settings>(JsonType);
  const [toLang, setToLang] = useState<Settings>(JsonType);
  const [targetValue, setTargetValue] = useState<string>("");

  useEffect(() => {
    if (value === "") {
      setTargetValue("");
      return;
    }
    try {
      const tmp = fromLang.fromType(value);
      const finalValue = toLang.toType(tmp);
      setTargetValue(finalValue);
    } catch (error) {
      setTargetValue(String(error));
    }
  }, [value, fromLang, toLang]);
  return (
    <>
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
      <CopyFormat fromLang={fromLang} value={value} />
      <CodeEditor languageSetting={toLang} value={targetValue} />
    </>
  );
};

export default App;
