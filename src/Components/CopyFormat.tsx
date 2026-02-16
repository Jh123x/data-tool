import type { Settings } from "../Logic/types";
import { ALL_DATA } from "../Logic/resolver";
import { Button, Card, Col, Row, Typography } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import DownloadAsFile from "../Logic/download";
import type { Data } from "./types";

interface CopyFormatProps {
  notificationAPI: NotificationInstance;
  irValue: Data;
  setValue: (val: string) => void;
  setLang: (val: Settings) => void;
}

export const CopyFormat = ({
  notificationAPI,
  irValue,
  setValue,
  setLang,
}: CopyFormatProps) => {
  return (
    <Row style={{ padding: "10px" }}>
      {ALL_DATA.map((currType: Settings, index: number) => {
        const currLanguageName = currType.language.toUpperCase();
        return (
          <Col
            key={index}
            span={24 / ALL_DATA.length}
            style={{
              padding: "5px",
            }}
          >
            <Card>
              <Typography>{currLanguageName}</Typography>
              <Button
                onClick={() => {
                  if (irValue.length === 0)
                    return notificationAPI.info({
                      title: "Input some data to get started",
                    });
                  const result = currType.toType(irValue);
                  navigator.clipboard.writeText(result);
                  notificationAPI.success({
                    title: `Copied as ${currLanguageName}`,
                  });
                }}
              >
                Copy {currLanguageName}
              </Button>
              <Button
                onClick={() => {
                  const currResult = currType.toType(irValue);
                  if (currResult.length === 0) {
                    notificationAPI.info({
                      title: "Input some data to get started",
                    });
                    return;
                  }
                  DownloadAsFile(
                    currLanguageName.toLowerCase(),
                    "output",
                    currResult,
                  );
                }}
              >
                Download {currLanguageName}
              </Button>
              <Button
                onClick={() => {
                  setLang(currType);
                  setValue(currType.getSample());
                }}
              >
                Example {currLanguageName}
              </Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CopyFormat;
