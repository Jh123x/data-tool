import path from "path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

const bundleLocation = await bundle({
  entryPoint: path.resolve("./video/src/index.ts"),
});

const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: "ProductVideo",
});

await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: "gif",
  outputLocation: "docs/main.gif",
});

console.log("✅ Video rendered");
