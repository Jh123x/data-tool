import React from "react";
import { Composition } from "remotion";
import { ProductScene } from "./scenes/ProductScene";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ProductVideo"
      component={ProductScene}
      durationInFrames={30 * 20}
      fps={30}
      width={1500}
      height={900}
    />
  );
};
