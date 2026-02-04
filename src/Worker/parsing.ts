import { getSettings } from "../Logic/resolver";
import type { MessageData, WorkerState } from "./types";

export const WorkFn = async (event: MessageEvent) => {
  try {
    const { fromType, data }: MessageData = event.data;
    if (data.length > 5000 * 1000) {
      self.postMessage([[], "Data too large to be processed"])
      return
    }

    const fromLang = getSettings(fromType);
    self.postMessage(fromLang.fromType(data));
  } catch (e) {
    self.postMessage([[], e]);
  }
};

self.onmessage = WorkFn;

