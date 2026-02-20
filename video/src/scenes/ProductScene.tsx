import { type FC, useEffect, useState } from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { ConfigProvider, theme, App, Col, Typography, Row, Button, Collapse } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { PageTitle } from "../../../src/Components/PageTitle";
import { LanguageDropdown } from "../../../src/Components/Dropdown";
import { JsonType } from "../../../src/Logic/json";
import { InputField } from "../../../src/Components/InputField";
import { CsvType } from "../../../src/Logic/csv";
import { OutputSection } from "../../../src/Components/OutputSection";
import { Data } from "../../../src/Components/types";
import { SECOND } from "./consts";

const finalInputValue = `[{"test":"test2"},{"test":"test3"},{"test2":"test4"}]`

export const ProductScene: FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateRight: "clamp" },
  );

  const [api, contextHolder] = useNotification();
  const [value, setValue] = useState<string>("");
  const [irValue, setIRValue] = useState<Data>([]);

  useEffect(() => {
    if (frame >= SECOND * 8) {
      setValue(finalInputValue);
    }
  }, [frame])

  useEffect(() => {
    const [data, errMsg] = CsvType.fromType(value);
    if (errMsg !== "") {
      api.error({
        title: errMsg,
      })
      return;
    }
    setIRValue(data);
  }, [value])


  return (
    <AbsoluteFill
      style={{
        background: "white",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter",
      }}
    >
      <AbsoluteFill>
        <ConfigProvider
          theme={{ algorithm: theme.defaultAlgorithm }}
        >
          <App>
            <Col
              style={{
                borderWidth: "1px",
                borderColor: "black",
                height: "80vh",
                widows: "100%",
                opacity: opacity,
              }}
            >
              <>
                {contextHolder}
                <PageTitle
                  title="Data Converter"
                  subText="Convert data between different formats."
                />
                <Typography.Title level={3}>From Format</Typography.Title>
                <Row>
                  <LanguageDropdown
                    currSelection={JsonType.language}
                    disabled={true}
                    setSelectedOption={() => { }}
                  />
                  <Button>
                    Toggle Autodetect
                  </Button>
                </Row>
                <InputField placeholder="Input Data" setValue={setValue} value={value} />
                <LanguageDropdown
                  currSelection={CsvType.language}
                  setSelectedOption={() => { }}
                />
                <OutputSection
                  irValue={irValue}
                  toLang={CsvType}
                  api={api}
                  setValue={setValue}
                  setFromLang={() => { }}
                />
              </>
            </Col>
          </App>
        </ConfigProvider>
        <Sequence from={0} durationInFrames={SECOND * 4}>
          <div>Welcome to the demo video</div>
        </Sequence>
        <Sequence from={SECOND * 4} durationInFrames={SECOND * 4}>
          <div>We paste in the input into the box</div>
        </Sequence>
        <Sequence from={SECOND * 8} durationInFrames={SECOND * 4}>
          <div>We can click on any of the output copy buttons to get the output we want</div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

