import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

interface InputProps {
  placeholder?: string;
  setValue?: (value: string) => void;
}

export const InputField = ({ placeholder, setValue }: InputProps) => {
  const setFn = setValue ?? (() => {});
  return (
    <TextArea
      rows={10}
      placeholder={placeholder}
      onChange={(event) => setFn(event.target.value)}
    />
  );
};
