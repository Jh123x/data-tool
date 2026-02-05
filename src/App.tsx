import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LanguageDropdown } from "./Components/Dropdown";
import { InputField } from "./Components/InputField";
import { getSettings } from "./Logic/resolver";
import type { Settings } from "./Logic/types";
import { PageTitle } from "./Components/PageTitle";
import { Button, notification, Row, Typography } from "antd";
import type { Data } from "./Components/types";
import { detectFormat } from "./Logic/auto_detect_format";
import { GetSettings, SetSettings } from "./Logic/storage";
import type { UserSettings } from "./Logic/user_settings";
import { debounce } from "lodash";
import type { MessageData } from "./Worker/types";
import { spawnParserWorker } from "./Logic/worker";
import useDebounce from "./Logic/useDebounce";
import { OutputSection } from "./Components/OutputSection";

const App = () => {
  const defaultSettings = GetSettings();
  const [api, contextHolder] = notification.useNotification();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 100);
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
  const notifyUser = useMemo(
    () =>
      debounce((errMsg: string) => {
        api.error({
          title: "Error Format",
          description: errMsg,
          duration: 2,
        });
      }, 200),
    [api],
  );

  useEffect(() => () => notifyUser.cancel(), [notifyUser]);

  const workerFn = useCallback(
    async (event: MessageEvent) => {
      const [tmp, errMsg] = event.data;
      if ((errMsg ?? "") === "") {
        setIR(tmp);
        return;
      }
      notifyUser(errMsg);
      setIR([]);
    },
    [setIR, notifyUser],
  );

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
    if (debouncedValue.length === 0) return;
    const detectedSettings = detectFormat(debouncedValue);
    setFromLang(detectedSettings);
  }, [isAutoDetect, debouncedValue]);

  // Update Intermediate Representation.
  useEffect(() => {
    if (debouncedValue.length === 0) {
      // If value is empty skip
      setIR([]);
      return;
    }

    // Wait for worker to spawn
    const worker = spawnParserWorker();
    worker.onmessage = async (event) => {
      workerFn(event);
    };

    worker.postMessage({
      fromType: fromLang.language,
      data: debouncedValue,
    } as MessageData);

    return () => {
      worker.terminate();
    };
  }, [fromLang, debouncedValue, workerFn]);

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
          onClick={() => {
            setAutoDetect(!isAutoDetect);
          }}
        >
          Toggle Autodetect
        </Button>
      </Row>
      <InputField placeholder="Input Data" setValue={setValue} value={value} />
      <LanguageDropdown
        currSelection={toLang.language}
        setSelectedOption={(res) => setToLang(getSettings(res))}
      />
      <OutputSection
        irValue={ir}
        toLang={toLang}
        api={api}
        setValue={setValue}
        setFromLang={setFromLang}
      />
    </>
  );
};

export default App;
