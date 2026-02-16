import { Button, Col } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { Settings } from "../Logic/types";
import { highlightAll } from '@speed-highlight/core';
import { useEffect, Suspense } from "react";
import { Loading } from "./Loading";


interface EditorProp {
  results: string;
  toLang: Settings;
  notificationAPI: NotificationInstance;
}

export const CodeEditor = ({
  results,
  toLang,
  notificationAPI,
}: EditorProp) => {
  const onCopy = () => {
    notificationAPI.success({
      title: `Copied as formatted ${toLang.language.toUpperCase()}`,
    });
    navigator.clipboard.writeText(results);
  };

  useEffect(() => {
    highlightAll();
  }, [results])

  return (
    <Col
      style={{
        position: "relative",
      }}
    >
      <Button
        style={{
          position: "absolute",
          top: "10px",
          right: "25px",
          display: results.length === 0 ? "none" : "block",
          zIndex: 1,
        }}
        onClick={onCopy}
      >
        Copy
      </Button>
      <Suspense fallback={<Loading />}>
        <Col
          className={`shj-multiline shj-lang-${toLang.language.toLowerCase()}`}
          style={{ zIndex: 0 }}
        >
          {results}
        </Col>
      </Suspense>
    </Col >
  );
};

export default CodeEditor;
