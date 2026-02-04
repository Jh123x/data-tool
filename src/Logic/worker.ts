export const spawnParserWorker = (): Worker => {
  const currWorker = new Worker(
    new URL("../Worker/parsing.ts", import.meta.url),
    { type: "module" },
  );
  return currWorker;
};

export const spawnResultWorker = (): Worker => {
  const currWorker = new Worker(
    new URL("../Worker/convert.ts", import.meta.url),
    { type: "module" },
  );

  return currWorker;
};
