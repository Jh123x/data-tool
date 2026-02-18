import { highlightElement } from "@speed-highlight/core";
import { forwardRef, RefObject, useEffect, useState, useTransition } from "react";
import { convertToShjLang } from "../../Logic/converter";
import { SupportedLanguage } from "../types";

interface SubElem {
  textRef: RefObject<null>
  language: SupportedLanguage
  results: string
}

const HighlightSubElem = forwardRef(({ textRef, language, results }: SubElem) => {
  const [isPending, startTxn] = useTransition();
  const [promise, setPromise] = useState<Promise<void>>(async () => { });
  useEffect(() => {
    startTxn(() => {
      if (!textRef.current || !results) return;
      setPromise(highlightElement(textRef.current, convertToShjLang(language), 'multiline'));
    })
  }, [language, results])
  if (isPending) throw promise
  return <></>
})

export default HighlightSubElem;
