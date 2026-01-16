import { Button } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Settings } from "../Logic/types";
import { Data } from "./types";

interface EditorProp {
  irValue: Data;
  toLang: Settings;
  value: string
  fromLang: Settings;
  notificationAPI: NotificationInstance;
}

export const CodeEditor = ({ irValue, toLang, value, fromLang, notificationAPI }: EditorProp) => {
  const [results, setResult] = useState<string>("");

  useEffect(() => {
    if (fromLang === toLang) {
      setResult(toLang.Prettify(value));
      return
    }
    const resultValue = toLang.toType(irValue);
    setResult(toLang.Prettify(resultValue));
  }, [irValue, toLang, fromLang, value]);

  const onCopy = () => {
    notificationAPI.success({
      title: "Copied to clipboard",
    });
    navigator.clipboard.writeText(results);
  }

  return (
    <div style={{
      position: "relative",
    }}>
      <Button style={{
        position: "absolute",
        top: "10px",
        right: "10px",
      }}
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
    </div>
  );
};

export default CodeEditor;
