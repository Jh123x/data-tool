import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Settings } from "../Logic/types";
import { Data } from "./types";

interface EditorProp {
  irValue: Data;
  languageSetting: Settings;
}

export const CodeEditor = ({ irValue, languageSetting }: EditorProp) => {
  const [results, setResult] = useState<string>("");

  useEffect(() => {
    const value = languageSetting.toType(irValue);
    setResult(languageSetting.Prettify(value));
  }, [irValue, languageSetting]);

  return (
    <SyntaxHighlighter
      language={languageSetting.language}
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
