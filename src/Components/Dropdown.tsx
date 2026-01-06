import { Dropdown, Button } from "antd";
import Layout from "antd/es/layout/layout";
import Typography from "antd/es/typography/Typography";
import { ALL_DATA } from "../Logic/resolver";

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
  const ALL_OPTIONS = ALL_DATA.map((v) => ({
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
