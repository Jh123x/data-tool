import { Input } from "antd";
import { debounce } from "lodash";
import { useCallback } from "react";
const { TextArea } = Input;

interface InputProps {
  placeholder?: string;
  value: string;
  setValue?: (value: string) => void;
}

export const InputField = ({ placeholder, setValue, value }: InputProps) => {
  const setFn = useCallback(debounce(setValue ?? (() => { }), 200), [setValue]);
  return (
    <TextArea
      rows={10}
      value={value}
      placeholder={placeholder}
      onChange={(event) => setFn(event.target.value)}
    />
  );
};
