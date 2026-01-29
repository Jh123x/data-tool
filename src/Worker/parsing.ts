import { getSettings } from "../Logic/resolver";
import type { MessageData } from "./types";

export const WorkFn = (event: MessageEvent) => {
  try {
    const { fromType, data }: MessageData = event.data;
    const fromLang = getSettings(fromType);
    self.postMessage(fromLang.fromType(data));
  } catch (e) {
    self.postMessage([[], e]);
  }
};

self.onmessage = WorkFn;

