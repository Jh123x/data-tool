import { Dropdown, Button } from "antd";
import { CsvType } from "../Logic/csv";
import { JsonType } from "../Logic/json";
import { TsvType } from "../Logic/tsv";

interface DropdownProps {
  currSelection: string;
  setOption: (selected: string) => void;
}

export const LanguageDropdown = ({
  currSelection,
  setOption,
}: DropdownProps) => {
  const ALL_OPTIONS = [JsonType, TsvType, CsvType].map((v) => ({
    key: v.language,
    label: (
      <Button
        onClick={() => {
          setOption(v.language);
        }}
      >
        {v.language}
      </Button>
    ),
  }));
  return (
    <Dropdown menu={{ items: ALL_OPTIONS }}>
      <Button>{currSelection ?? "Choose an option"}</Button>
    </Dropdown>
  );
};
