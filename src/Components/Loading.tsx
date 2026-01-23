import { Flex, Spin } from "antd";
import type { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";

interface LoadingProps {
  message?: string;
}

export const Loading: FC = ({ message }: LoadingProps) => {
  return (
    <Flex dir="column" align="center" justify="center" gap="middle">
      <Spin size="large" indicator={<LoadingOutlined spin />} />
      <Typography>{message ?? "Loading..."}</Typography>
    </Flex>
  );
};
