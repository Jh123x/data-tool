import React from "react";
import { Composition } from "remotion";
import { FRAME_RATE, SECOND } from "./scenes/consts";
import { ProductScene } from "./scenes/ProductScene";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ProductVideo"
      component={ProductScene}
      durationInFrames={SECOND * 30}
      fps={FRAME_RATE}
      width={1500}
      height={800}
    />
  );
};
