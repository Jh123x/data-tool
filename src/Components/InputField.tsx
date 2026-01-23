import { Input } from "antd";

const { TextArea } = Input;

interface InputProps {
  placeholder?: string;
  setValue?: (value: string) => void;
  value?: string;
}

export const InputField = ({ placeholder, setValue, value }: InputProps) => {
  const setFn = setValue ?? (() => {});
  return (
    <TextArea
      rows={10}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(event) => setFn(event.target.value)}
    />
  );
};
