import { type FC, useEffect, useState } from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { ConfigProvider, theme, App, Col, Typography, Row, Button } from "antd";
import useNotification from "antd/es/notification/useNotification";
import { PageTitle } from "../../../src/Components/PageTitle";
import { LanguageDropdown } from "../../../src/Components/Dropdown";
import { JsonType } from "../../../src/Logic/json";
import { InputField } from "../../../src/Components/InputField";
import { CsvType } from "../../../src/Logic/csv";
import { OutputSection } from "../../../src/Components/OutputSection";
import { Data } from "../../../src/Components/types";
import { SECOND } from "./consts";
import { Subtitles } from "../components/SubTitles";
import { Cursor } from "../components/Cursor";
import { Animated, Move } from "remotion-animated";

const finalInputValue = `[{"test":"test2"},{"test":"test3"},{"test2":"test4"}]`
const subTitles = [
  { start: 0, end: SECOND * 2, text: "Welcome to our data converter" },
  { start: SECOND * 2, end: SECOND * 4, text: "It renders datasets between different forms instantly." },
  { start: SECOND * 4, end: SECOND * 6, text: "Built with Ant Design and React." },
  { start: SECOND * 6, end: SECOND * 10, text: "1st Paste the input." },
  { start: SECOND * 10, end: SECOND * 12, text: "Click on the outputs which you want to get." },
  { start: SECOND * 12, end: SECOND * 18, text: "We support switching between JSON, CSV & TSV." },
  { start: SECOND * 18, end: SECOND * 22, text: "You will see a notification based on what you click." },
  { start: SECOND * 22, end: SECOND * 25, text: "Visit us at https://data.jh123x.com" },
]

export const ProductScene: FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, SECOND / 2],
    [0, 1],
    { extrapolateRight: "clamp" },
  );
  const [api, _] = useNotification();
  const [value, setValue] = useState<string>("");
  const [irValue, setIRValue] = useState<Data>([]);
  const [click, setClick] = useState<boolean>(false);

  useEffect(() => {
    if (frame >= SECOND * 8) { setValue(finalInputValue) } else { setValue("") };
    setClick(
      (frame >= 7.5 * SECOND && frame <= SECOND * 8) ||
      (frame >= 12.5 * SECOND && frame <= SECOND * 13) ||
      (frame >= 13.5 * SECOND && frame <= SECOND * 14) ||
      (frame >= 14.5 * SECOND && frame <= SECOND * 15)
    )
  }, [frame])

  useEffect(() => {
    const [data, _] = CsvType.fromType(value);
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
            <Subtitles items={subTitles} />
          </Col>
        </App>
        <Sequence from={SECOND * 2} durationInFrames={SECOND * 20}>
          <Animated
            animations={[
              Move({ x: -650, y: -200, start: SECOND * 5, duration: SECOND * 0.5 }),
              Move({ x: 0, y: 370, start: SECOND * 10, duration: SECOND * 0.5 }),
              Move({ x: 450, y: 0, start: SECOND * 11, duration: SECOND * 0.5 }),
              Move({ x: 500, y: 0, start: SECOND * 12, duration: SECOND * 0.5 }),
            ]}
          >
            <Cursor x={750} y={450} isClick={click} />
          </Animated>
        </Sequence>
      </ConfigProvider>
    </AbsoluteFill>
  );
};

