import { Button, Col } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { Settings } from "../Logic/types";
import { Suspense, lazy } from "react";
import { Loading } from "./Loading";

const SyntaxHighlighter = lazy(() => import('./SyntaxHighlight/SyntaxHighlight'))

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

  return (
    <Col
      style={{
        position: "relative",
      }}
    >
      <Suspense fallback={<Loading message={"Adding Syntax Highlighting"} />}>
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
        <SyntaxHighlighter language={toLang.language} results={results} />
      </Suspense>
    </Col >
  );
};

export default CodeEditor;
