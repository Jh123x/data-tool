import { Button, Col } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Settings } from "../Logic/types";
import type { Data } from "./types";

interface EditorProp {
  irValue: Data;
  toLang: Settings;
  notificationAPI: NotificationInstance;
}

export const CodeEditor = ({
  irValue,
  toLang,
  notificationAPI,
}: EditorProp) => {
  const [results, setResult] = useState<string>("");

  useEffect(() => {
    const resultValue = toLang.toType(irValue);
    setResult(toLang.Prettify(resultValue));
  }, [irValue, toLang]);

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
      <Button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: results.length === 0 ? "none" : "block",
        }}
        hidden={results.length == 0}
        onClick={onCopy}
      >
        Copy
      </Button>
      <SyntaxHighlighter
        language={toLang.language}
        showInlineLineNumbers={true}
        wrapLongLines={true}
        showLineNumbers={true}
        startingLineNumber={1}
        customStyle={{
          maxHeight: "50%",
        }}
      >
        {results}
      </SyntaxHighlighter>
    </Col>
  );
};

export default CodeEditor;
