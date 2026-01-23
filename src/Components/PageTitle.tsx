import { Typography } from "antd";

const { Title, Text } = Typography;

interface TitleProps {
  title: string;
  subText?: string;
}

export const PageTitle = ({ title, subText }: TitleProps) => {
  return (
    <>
      <Title>{title}</Title>
      {subText && (
        <Text type="secondary" code={false}>
          {subText}
        </Text>
      )}
    </>
  );
};
