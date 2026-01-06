import { Dropdown, Button, Grid } from "antd";
import CardGrid from "antd/es/card/CardGrid";
import Layout from "antd/es/layout/layout";
import Typography from "antd/es/typography/Typography";
import { CsvType } from "../Logic/csv";
import { JsonType } from "../Logic/json";
import { TsvType } from "../Logic/tsv";

interface DropdownProps {
  label: string;
  currSelection: string;
  setOption: (selected: string) => void;
}

export const LanguageDropdown = ({
  label,
  currSelection,
  setOption,
}: DropdownProps) => {
  const ALL_OPTIONS = [JsonType, TsvType, CsvType].map((v) => ({
    key: v.language,
    label: (
      <Typography
        onClick={() => {
          setOption(v.language);
        }}
      >
        {v.language}
      </Typography>
    ),
  }));
  return (
    <Layout
      style={{
        rowGap: "10px",
        gap: "10px",
      }}
    >
      <Typography>{label}</Typography>
      <Dropdown menu={{ items: ALL_OPTIONS }}>
        <Button>{currSelection ?? "Choose an option"}</Button>
      </Dropdown>
    </Layout>
  );
};
