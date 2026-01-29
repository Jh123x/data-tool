export const spawnWorker = (setResult: (event: MessageEvent) => void): Worker => {
  const currWorker = new Worker(
    new URL("../Worker/parsing.ts", import.meta.url),
    { type: "module" },
  );
  currWorker.onmessage = setResult
  return currWorker;
}
