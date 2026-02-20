import React from "react";
import { Composition } from "remotion";
import { ProductScene } from "./scenes/ProductScene";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ProductVideo"
      component={ProductScene}
      durationInFrames={180}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
