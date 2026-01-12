import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Settings } from "../Logic/types";
import { Data } from "./types";

interface EditorProp {
  irValue: Data;
  toLang: Settings;
  value: string
  fromLang: Settings;
}

export const CodeEditor = ({ irValue, toLang, value, fromLang }: EditorProp) => {
  const [results, setResult] = useState<string>("");

  useEffect(() => {
    if (fromLang === toLang) {
      setResult(toLang.Prettify(value));
      return
    }
    const resultValue = toLang.toType(irValue);
    setResult(toLang.Prettify(resultValue));
  }, [irValue, toLang, fromLang, value]);

  return (
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
  );
};

export default CodeEditor;
