import { Input } from "antd";
const { TextArea } = Input;

interface InputProps {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}

export const InputField = ({ placeholder, setValue, value }: InputProps) => {
  return (
    <TextArea
      rows={10}
      value={value}
      placeholder={placeholder}
      onChange={(event) => {
        setValue(event.target.value)
      }}
    />
  );
};
