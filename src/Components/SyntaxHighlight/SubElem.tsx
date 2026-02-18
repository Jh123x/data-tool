import { highlightElement } from "@speed-highlight/core";
import { RefObject, useEffect, useState, useTransition } from "react";
import { convertToShjLang } from "../../Logic/converter";
import { SupportedLanguage } from "../types";

interface SubElem {
  ref: RefObject<null>
  language: SupportedLanguage
  results: string
}

const HighlightSubElem = ({ ref, language, results }: SubElem) => {
  const [isPending, startTxn] = useTransition();
  const [promise, setPromise] = useState<Promise<void>>(async () => { });
  useEffect(() => {
    startTxn(() => {
      if (!ref.current || !results) return;
      setPromise(highlightElement(ref.current, convertToShjLang(language), 'multiline'));
    })
  }, [language, results])
  if (isPending) throw promise
  return <></>
}

export default HighlightSubElem;
