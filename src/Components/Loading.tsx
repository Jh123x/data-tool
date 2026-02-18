import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";

interface LoadingProps {
  message?: string;
  isHidden?: boolean
}

export const Loading = ({ message, isHidden }: LoadingProps) => {
  return (
    <Flex
      dir="column"
      align="center"
      justify="center"
      gap="middle"
      style={{
        display: isHidden ? 'none' : 'inline-flex'
      }}
    >
      <Spin size="large" indicator={<LoadingOutlined spin />} />
      <Typography>{message ?? "Loading..."}</Typography>
    </Flex>
  );
};

export default Loading
