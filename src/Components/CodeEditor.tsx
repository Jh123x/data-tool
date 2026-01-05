import React, { Suspense, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Settings } from "../Logic/types";

interface EditorProp {
  value?: string;
  languageSetting: Settings;
}

export const CodeEditor = ({ value, languageSetting }: EditorProp) => {
  const [results, setResult] = useState<string>("");
  useEffect(() => {
    setResult(languageSetting.Prettify(value ?? ""));
  }, [value, languageSetting]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SyntaxHighlighter
        language={languageSetting.language}
        showInlineLineNumbers={true}
      >
        {results}
      </SyntaxHighlighter>
    </Suspense>
  );
};
