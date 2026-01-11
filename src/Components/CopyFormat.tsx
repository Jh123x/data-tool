import type { Settings } from "../Logic/types";
import { ALL_DATA } from "../Logic/resolver";
import { Button, Card, Col, notification, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { setIsCopiedFactory } from "./Copy";

interface CopyFormatProps {
  fromLang: Settings;
  value: string;
}

export const CopyFormat = ({ fromLang, value }: CopyFormatProps) => {
  const [api, contextHolder] = notification.useNotification();
  const [currIR, setCurrIR] = useState<Array<Record<string, any>>>([]);
  const setIsCopied = setIsCopiedFactory(api);

  useEffect(() => {
    if (value === "") return setCurrIR([]);
    setCurrIR(fromLang.fromType(value));
  }, [fromLang, value]);

  return (
    <>
      {contextHolder}
      <Row
        style={{
          padding: "10px",
        }}
      >
        {ALL_DATA.map((currType: Settings) => {
          const currLanguangeName = currType.language.toUpperCase();
          return (
            <Col
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
                      return setIsCopied(
                        "info",
                        "Empty Value",
                        "Input some data to get started",
                      );
                    const result = currType.toType(currIR);
                    navigator.clipboard.writeText(result);
                    setIsCopied(
                      "success",
                      `Copied data as ${currLanguangeName}`,
                    );
                  }}
                >
                  Copy {currType.language.toUpperCase()}
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
