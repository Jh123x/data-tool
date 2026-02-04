import { Col, Typography } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { lazy, useRef, useTransition, useState, useEffect } from "react";
import type { Settings } from "../Logic/types";
import useDebounce from "../Logic/useDebounce";
import { spawnResultWorker } from "../Logic/worker";
import type { ResultData } from "../Worker/types";
import { Loading } from "./Loading";
import type { Data } from "./types";

// Lazy loading for bulky container
const CodeEditorComponent = lazy(() => import("./CodeEditor"));
const CopyFormatComponent = lazy(() => import("./CopyFormat"));

interface SectionProps {
  irValue: Data;
  toLang: Settings;
  api: NotificationInstance;
  setValue: (val: string) => void;
  setFromLang: (val: Settings) => void;
}

export const OutputSection = ({
  irValue,
  toLang,
  api,
  setValue,
  setFromLang,
}: SectionProps) => {
  const workerRef = useRef<Worker | null>(null);
  const [isPending, startTransition] = useTransition();
  const [results, setResult] = useState<string>("");
  const debouncedIR = useDebounce<Data>(irValue, 100);

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = spawnResultWorker();
    }

    const worker = workerRef.current;
    worker.onmessage = async (event: MessageEvent<string>) => {
      startTransition(() => {
        setResult(toLang.Prettify(event.data));
      });
    };

    worker.postMessage({
      toType: toLang.language,
      data: debouncedIR,
    } as ResultData);

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [debouncedIR, toLang]);
  return (
    <>
      {isPending ? (
        <Col style={{ padding: "10px" }}>
          <Loading />
        </Col>
      ) : (
        <>
          <Typography.Title level={3}>To Format</Typography.Title>
          <CopyFormatComponent
            notificationAPI={api}
            irValue={irValue}
            setValue={setValue}
            setLang={setFromLang}
          />
          <CodeEditorComponent
            toLang={toLang}
            notificationAPI={api}
            results={results}
          />
        </>
      )}
    </>
  );
};
