export const spawnWorker = (): Worker => {
  const currWorker = new Worker(
    new URL("../Worker/parsing.ts", import.meta.url),
    { type: "module" },
  );
  return currWorker;
}
