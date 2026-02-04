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
import { spawnWorker } from "./Logic/worker";
import useDebounce from "./Logic/useDebounce";

// Lazy loading for bulky container
const CodeEditorComponent = lazy(() => import("./Components/CodeEditor"));
const CopyFormatComponent = lazy(() => import("./Components/CopyFormat"));

const App = () => {
  const defaultSettings = GetSettings();
  const [api, contextHolder] = notification.useNotification();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 200);
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

  // Create debounced update
  const notifyUser = useCallback(
    debounce((errMsg) => {
      api.error({
        title: "Error Format",
        description: errMsg,
        duration: 2,
      });
    }, 200),
    [api],
  );

  const workerFn = useCallback(async (event: MessageEvent) => {
    const [tmp, errMsg] = event.data;
    if ((errMsg ?? "") === "") {
      setIR(tmp);
      return;
    }
    notifyUser(errMsg);
    setIR([]);
  }, [setIR, notifyUser]);

  const [worker, setWorker] = useState<Worker | null>(null);

  // Save the user settings.
  useEffect(() => {
    const userSettings: UserSettings = {
      isAutoDetect: isAutoDetect,
      fromLang: fromLang.language,
      toLang: toLang.language,
    };
    SetSettings(userSettings);
  }, [fromLang, toLang, isAutoDetect]);

  // Format detection.
  useEffect(() => {
    if (!isAutoDetect) return;
    const detectedSettings = detectFormat(value);
    setFromLang(detectedSettings);
  }, [isAutoDetect, value]);

  // Update Intermediate Representation.
  useEffect(() => {
    if (debouncedValue.length === 0) {
      // If value is empty skip
      setIR([]);
      return;
    }

    if (!worker) {
      // This triggers this useEffect to run again
      setWorker(spawnWorker);
      return;
    }

    worker.postMessage({
      fromType: fromLang.language,
      data: debouncedValue,
    } as MessageData);

    worker.onmessage = async (event) => { workerFn(event) }

    return () => {
      worker.terminate();
      setWorker(null);
    };
  }, [fromLang, debouncedValue, worker]);

  return (
    <>
      {contextHolder}
      <PageTitle
        title="Data Converter"
        subText="Convert data between different formats."
      />
      <Typography.Title level={3}>From Format</Typography.Title>
      <Row>
        <LanguageDropdown
          currSelection={fromLang.language}
          disabled={isAutoDetect}
          setSelectedOption={(res) => setFromLang(getSettings(res))}
        />
        <Button
          onClick={() => { setAutoDetect(!isAutoDetect) }}
        >
          Toggle Autodetect
        </Button>
      </Row>
      <InputField placeholder="Input Data" setValue={setValue} value={value} />
      <LanguageDropdown
        currSelection={toLang.language}
        setSelectedOption={(res) => setToLang(getSettings(res))}
      />
      <Typography.Title level={3}>To Format</Typography.Title>
      <Suspense fallback={<Loading />}>
        <CopyFormatComponent
          notificationAPI={api}
          irValue={ir}
          setValue={setValue}
          setLang={setFromLang}
        />
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
