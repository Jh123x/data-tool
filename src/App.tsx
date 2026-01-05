import React, { useState } from "react";
import { CodeEditor } from "./Components/CodeEditor";
import { LanguageDropdown } from "./Components/Dropdown";
import { InputField } from "./Components/InputField";
import { JsonType } from "./Logic/json";
import { getSettings } from "./Logic/resolver";
import { Settings } from "./Logic/types";

const App = () => {
  const [value, setValue] = useState<string>("");
  const [lang, setLang] = useState<Settings>(JsonType);
  return (
    <>
      <LanguageDropdown
        currSelection={lang.language}
        setOption={(res) => setLang(getSettings(res))}
      />
      <InputField placeholder="Input Data" setValue={setValue} />
      <CodeEditor languageSetting={lang} value={value} />
    </>
  );
};

export default App;
