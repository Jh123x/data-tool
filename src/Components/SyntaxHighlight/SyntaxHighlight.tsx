import { Col } from "antd"
import { lazy, useRef } from "react"
import type { SupportedLanguage } from "../types"

const HighlightSubElemComponent = lazy(() => import('./SubElem'));

interface SyntaxHighlightProps {
  results: string
  language: SupportedLanguage
}

const SyntaxHighlight = ({ results, language }: SyntaxHighlightProps) => {
  const textRef = useRef(null);

  return <>
    <Col ref={textRef} style={{ zIndex: 0, }}>{results}</Col>
    <HighlightSubElemComponent ref={textRef} language={language} results={results} />
  </>
}

export default SyntaxHighlight;
