import { Input } from "antd";
import { debounce } from "lodash";
import { useCallback } from "react";
const { TextArea } = Input;

interface InputProps {
  placeholder?: string;
  setValue?: (value: string) => void;
}

export const InputField = ({ placeholder, setValue }: InputProps) => {
  const setFn = useCallback(debounce(setValue ?? (() => { }), 200), [setValue]);
  return (
    <TextArea
      rows={10}
      placeholder={placeholder}
      onChange={(event) => setFn(event.target.value)}
    />
  );
};
