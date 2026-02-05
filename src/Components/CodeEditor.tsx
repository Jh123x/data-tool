import { Button, Col } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Settings } from "../Logic/types";

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
      <>
        <Button
          style={{
            position: "absolute",
            top: "10px",
            right: "25px",
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
            maxHeight: "100%",
            overflowY: "auto",
          }}
        >
          {results}
        </SyntaxHighlighter>
      </>
    </Col>
  );
};

export default CodeEditor;
