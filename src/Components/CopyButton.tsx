import { Typography, Button, notification } from "antd";
import { useState } from "react";

interface CopyProps {
  value: string;
}

type NotificationType = "success" | "info" | "warning" | "error";

export const CopyButton = ({ value }: CopyProps) => {
  const [api, contextHolder] = notification.useNotification();

  const setIsCopied = (
    type: NotificationType,
    title: string,
    message: string,
  ) => {
    api[type]({
      title: title,
      description: message,
      duration: 2,
    });
  };
  return (
    <>
      {contextHolder}
      <Button
        onClick={() => {
          if (value === "")
            return setIsCopied(
              "info",
              "Value is empty",
              "Input some data to be converted",
            );

          navigator.clipboard.writeText(value);
          setIsCopied("success", "Value Copied");
        }}
      >
        <Typography>Copy</Typography>
      </Button>
    </>
  );
};
