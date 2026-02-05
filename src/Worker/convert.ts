import { getSettings } from "../Logic/resolver";
import type { ResultData } from "./types";

export const WorkFn = async (event: MessageEvent) => {
  try {
    const { toType, data }: ResultData = event.data;
    const fromLang = getSettings(toType);
    self.postMessage(fromLang.toType(data));
  } catch (e) {
    self.postMessage("");
  }
};

self.onmessage = WorkFn;
