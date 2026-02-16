import { Col, Collapse, CollapseProps, Typography } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { lazy, Suspense, useRef, useTransition, useState, useEffect } from "react";
import type { Settings } from "../Logic/types";
import useDebounce from "../Logic/useDebounce";
import { spawnResultWorker } from "../Logic/worker";
import type { ResultData } from "../Worker/types";
import { Loading } from "./Loading";
import type { Data } from "./types";


const CopyFormatComponent = lazy(() => import('./CopyFormat'));
const CodeEditorComponent = lazy(() => import('./CodeEditor'));

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
    if (!workerRef.current) workerRef.current = spawnResultWorker();
    const worker = workerRef.current;

    worker.onmessage = async (event: MessageEvent<string>) => {
      startTransition(() => {
        setResult(toLang.Prettify(event.data));
      });
    };

    startTransition(() => {
      worker.postMessage({
        toType: toLang.language,
        data: debouncedIR,
      } as ResultData);
    });

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [debouncedIR, toLang]);
  const items: CollapseProps['items'] = [
    {
      key: 1,
      label: "Show formatted code",
      children: <CodeEditorComponent
        toLang={toLang}
        notificationAPI={api}
        results={results}
      />,
    }
  ];

  return (
    <>
      {isPending ? (
        <Col style={{ padding: "10px" }}>
          <Loading />
        </Col>
      ) : (
        <>
          <Typography.Title level={3}>To Format</Typography.Title>
          <Suspense fallback={<Loading />}>
            <CopyFormatComponent
              notificationAPI={api}
              irValue={irValue}
              setValue={setValue}
              setLang={setFromLang}
            />
            <Collapse
              items={items}
              destroyOnHidden={true}
            />
          </Suspense>
        </>
      )
      }
    </>
  );
};
