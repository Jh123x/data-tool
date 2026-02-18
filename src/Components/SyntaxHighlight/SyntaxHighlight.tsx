import { highlightElement } from "@speed-highlight/core";
import { Col } from "antd"
import { useEffect, useRef, useState } from "react"
import { convertToShjLang } from "../../Logic/converter";
import type { SupportedLanguage } from "../types"


interface SyntaxHighlightProps {
  results: string
  language: SupportedLanguage
}

const SyntaxHighlight = ({ results, language }: SyntaxHighlightProps) => {
  const textRef = useRef(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [promise, setPromise] = useState<Promise<void>>(Promise.resolve());

  useEffect(() => {
    setPromise(async () => {
      if (!textRef.current) {
        return;
      }

      setIsPending(true);
      if (!results) {
        setIsPending(false);
        return;
      }

      await highlightElement(textRef.current, convertToShjLang(language), 'multiline')
      setIsPending(false);
    });
  }, [language, results])

  if (isPending) throw promise

  return <Col ref={textRef} style={{ zIndex: 0 }}>{results}</Col>
}

export default SyntaxHighlight;
