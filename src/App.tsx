import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { LanguageDropdown } from "./Components/Dropdown";
import { InputField } from "./Components/InputField";
import { getSettings } from "./Logic/resolver";
import type { Settings } from "./Logic/types";
import { PageTitle } from "./Components/PageTitle";
import { Button, notification, Row, Typography } from "antd";
import type { Data } from "./Components/types";
import { detectFormat } from "./Logic/auto_detect_format";
import { Loading } from "./Components/Loading";
import { GetSettings, SetSettings } from "./Logic/storage";
import type { UserSettings } from "./Logic/user_settings";
import { debounce } from "lodash";
import type { MessageData } from "./Worker/types";

const App = () => {
  const defaultSettings = GetSettings();
  const [api, contextHolder] = notification.useNotification();
  const [value, setValue] = useState<string>("");
  const [fromLang, setFromLang] = useState<Settings>(
    getSettings(defaultSettings.fromLang),
  );
  const [toLang, setToLang] = useState<Settings>(
    getSettings(defaultSettings.toLang),
  );
  const [ir, setIR] = useState<Data>([]);
  const [isAutoDetect, setAutoDetect] = useState<boolean>(
    defaultSettings.isAutoDetect,
  );

  // Save the user settings.
  useEffect(() => {
    const userSettings: UserSettings = {
      isAutoDetect: isAutoDetect,
      fromLang: fromLang.language,
      toLang: toLang.language,
    };
    SetSettings(userSettings);
  }, [fromLang, toLang, value, isAutoDetect]);

  // Format detection.
  useEffect(() => {
    if (!isAutoDetect) return;
    const detectedSettings = detectFormat(value);
    setFromLang(detectedSettings);
  }, [isAutoDetect, value]);

  // Create debounced update
  const notifyUser = useCallback(
    debounce((errMsg) => {
      api.error({
        title: "Error Format",
        description: errMsg,
        duration: 2,
      });
    }, 200),
    [],
  );

  // Update Intermediate Representation.
  useEffect(() => {
    if (value.length === 0) {
      setIR([]);
      return;
    }

    const worker = new Worker(new URL("./Worker/parsing.ts", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (event: MessageEvent) => {
      const [tmp, errMsg] = event.data;
      if ((errMsg ?? "") === "") {
        setIR(tmp);
        return;
      }
      notifyUser(errMsg);
      setIR([]);
    };

    worker.postMessage({
      fromType: fromLang.language,
      data: value,
    } as MessageData);

    return () => {
      worker.terminate();
    };
  }, [fromLang, value, api]);

  // Lazy loading for bulky container
  const CodeEditorComponent = lazy(() => import("./Components/CodeEditor"));
  const CopyFormatComponent = lazy(() => import("./Components/CopyFormat"));

  return (
    <>
      {contextHolder}
      <PageTitle
        title="Data Converter"
        subText="Convert data between different formats."
      />
      <Typography>From Format</Typography>
      <Row>
        <LanguageDropdown
          label="From Format"
          currSelection={fromLang.language}
          disabled={isAutoDetect}
          setSelectedOption={(res) => setFromLang(getSettings(res))}
        />
        <Button
          onClick={() => {
            setAutoDetect(!isAutoDetect);
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
      <Suspense fallback={<Loading />}>
        <CopyFormatComponent notificationAPI={api} irValue={ir} />
        <CodeEditorComponent
          toLang={toLang}
          irValue={ir}
          notificationAPI={api}
        />
      </Suspense>
    </>
  );
};

export default App;
