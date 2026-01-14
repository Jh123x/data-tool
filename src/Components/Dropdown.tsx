import { Dropdown, Button, Typography, Layout } from "antd";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useEffect, useState } from "react";
import { ALL_DATA } from "../Logic/resolver";

interface DropdownProps {
  label: string;
  currSelection: string;
  disabled?: boolean;
  setSelectedOption: (selected: string) => void;
}

export const LanguageDropdown = ({
  currSelection,
  setSelectedOption,
  disabled,
}: DropdownProps) => {
  const [options, setOptions] = useState<ItemType<MenuItemType>[]>([]);

  useEffect(() => {
    const res = ALL_DATA.map(
      (v) => ({
        key: v.language,
        label: (
          <Typography onClick={() => setSelectedOption(v.language)}>
            {v.language}
          </Typography>
        ),
      }),
      [setSelectedOption],
    );

    setOptions(res);
  }, [setSelectedOption]);

  return (
    <Layout
      style={{
        rowGap: "10px",
        gap: "10px",
      }}
    >
      <Dropdown menu={{ items: options }} disabled={disabled ?? false}>
        <Button>{currSelection ?? "Choose an option"}</Button>
      </Dropdown>
    </Layout>
  );
};
