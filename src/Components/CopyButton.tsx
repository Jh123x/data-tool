import { Button } from "antd";
import { Typography } from "antd";
import { useState } from "react";

interface CopyProps {
  value: string;
}

export const CopyButton = ({ value }: CopyProps) => {
  const [label, setLabel] = useState<string>("");
  return (
    <>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(value);
          setLabel("Copied!");
          setTimeout(() => {
            setLabel("");
          }, 3000);
        }}
      >
        <Typography>Copy</Typography>
      </Button>
      {label !== "" ? <Typography>{label}</Typography> : <></>}
    </>
  );
};
