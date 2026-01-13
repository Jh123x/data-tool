import type { Settings } from "../Logic/types";
import { ALL_DATA } from "../Logic/resolver";
import { Button, Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { NotificationInstance } from "antd/es/notification/interface";
import DownloadAsFile from "../Logic/download";

interface CopyFormatProps {
  fromLang: Settings;
  value: string;
  notificationAPI: NotificationInstance;
}

export const CopyFormat = ({
  fromLang,
  value,
  notificationAPI,
}: CopyFormatProps) => {
  const [currIR, setCurrIR] = useState<Array<Record<string, any>>>([]);

  useEffect(() => {
    if (value === "") return setCurrIR([]);
    const [result, errMsg] = fromLang.fromType(value);
    if ((errMsg ?? "") !== "") {
      notificationAPI.error({
        title: "Error format",
        description: errMsg,
      });
      setCurrIR([]);
      return;
    }
    setCurrIR(result);
  }, [fromLang, value, notificationAPI]);

  return (
    <>
      <Row
        style={{
          padding: "10px",
        }}
      >
        {ALL_DATA.map((currType: Settings, index: number) => {
          const currLanguangeName = currType.language.toUpperCase();
          return (
            <Col
              key={index}
              span={24 / ALL_DATA.length}
              style={{
                padding: "5px",
              }}
            >
              <Card>
                <Typography>{currLanguangeName}</Typography>
                <Button
                  onClick={() => {
                    if (currIR.length === 0)
                      return notificationAPI.info({
                        title: "Empty Value",
                        description: "Input some data to get started",
                      });
                    const result = currType.toType(currIR);
                    navigator.clipboard.writeText(result);
                    notificationAPI.success({
                      title: `Copied data as ${currLanguangeName}`,
                    });
                  }}
                >
                  Copy {currLanguangeName}
                </Button>
                <Button
                  onClick={() => {
                    const currResult = currType.toType(currIR)
                    if (currResult.length === 0 || value.length === 0) {
                      notificationAPI.info({
                        title: "Empty Value",
                        description: "Input some data to get started",
                      })
                      return
                    }
                    DownloadAsFile(currLanguangeName.toLowerCase(), "output", currResult)
                  }}
                >
                  Download {currLanguangeName}
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
