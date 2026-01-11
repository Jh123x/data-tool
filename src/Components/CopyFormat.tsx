import type { Settings } from "../Logic/types";
import { ALL_DATA } from "../Logic/resolver";
import { Button, Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import type { NotificationProps } from "./Copy";

interface CopyFormatProps {
  fromLang: Settings;
  value: string;
  setNotification: (_: NotificationProps) => void;
}

export const CopyFormat = ({
  fromLang,
  value,
  setNotification,
}: CopyFormatProps) => {
  const [currIR, setCurrIR] = useState<Array<Record<string, any>>>([]);

  useEffect(() => {
    if (value === "") return setCurrIR([]);
    const [result, errMsg] = fromLang.fromType(value);
    if ((errMsg ?? "") !== "") {
      setNotification({
        type: "error",
        title: "Error format",
        message: errMsg,
      });
      setCurrIR([]);
      return;
    }
    setCurrIR(result);
  }, [fromLang, value, setNotification]);

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
                      return setNotification({
                        type: "info",
                        title: "Empty Value",
                        message: "Input some data to get started",
                      });
                    const result = currType.toType(currIR);
                    navigator.clipboard.writeText(result);
                    setNotification({
                      type: "success",
                      title: `Copied data as ${currLanguangeName}`,
                    });
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
