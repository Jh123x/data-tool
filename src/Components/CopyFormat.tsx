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
      {ALL_DATA.map((currType: Settings) => {
        const currLanguageName = currType.language.toUpperCase();
        return (
          <Col
            key={currLanguageName}
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
                Copy
              </Button>
              <Button
                onClick={() => {
                  if (irValue.length === 0) {
                    return notificationAPI.info({
                      title: "Input some data to get started"
                    })
                  }

                  const result = currType.toType(irValue);
                  navigator.clipboard.writeText(currType.Prettify(result));
                  notificationAPI.success({
                    title: `Copied Formatted ${currLanguageName}`
                  })
                }}
              >
                Copy Formatted
              </Button>
              <Button
                onClick={() => {
                  if (irValue.length === 0) {
                    notificationAPI.info({
                      title: "Input valid data to get started"
                    })
                    return
                  }
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
                Download
              </Button>
              <Button
                onClick={() => {
                  setLang(currType);
                  setValue(currType.getSample());
                }}
              >
                Show Example
              </Button>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default CopyFormat;
