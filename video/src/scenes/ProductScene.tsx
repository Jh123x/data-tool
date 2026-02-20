import { type FC, useEffect, useState } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
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
import { Cursor } from "../components/cursor";

const finalInputValue = `[{"test":"test2"},{"test":"test3"},{"test2":"test4"}]`
const subTitles = [
  { start: 0, end: SECOND * 2, text: "Welcome to our data converter" },
  { start: SECOND * 2, end: SECOND * 4, text: "It renders datasets between different forms instantly." },
  { start: SECOND * 4, end: SECOND * 6, text: "Built with Ant Design and React." },
  { start: SECOND * 6, end: SECOND * 10, text: "1st Paste the input." },
  { start: SECOND * 10, end: SECOND * 16, text: "Click on the outputs which you want to get." },
  { start: SECOND * 16, end: SECOND * 18, text: "You will see a notification based on what you click" },
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

  useEffect(() => {
    if (frame >= SECOND * 8) setValue(finalInputValue);
    if (frame >= SECOND * 16) api.info({ "title": "Copied as CSV" })
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

  const x = interpolate(frame, [0, 60], [100, 400]);
  const y = interpolate(frame, [0, 60], [100, 300]);

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
          </Col>
        </App>
      </ConfigProvider>
      <Subtitles items={subTitles} />
      <Cursor x={x} y={y} />
    </AbsoluteFill>
  );
};

