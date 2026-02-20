import React from "react";
import { AbsoluteFill } from "remotion";
import MyApp from "../../../src/App";
import { ConfigProvider, theme, App } from "antd";

export const ProductScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <App>
          <MyApp />
        </App>
      </ConfigProvider>
    </AbsoluteFill>
  );
};

