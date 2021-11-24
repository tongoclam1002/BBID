import { Dropdown, Menu } from "antd";
import { useState } from "react";
import i18n from "../i18n";
export default function DropdownLanguage() {
  const [visible, setVisible] = useState(false);

  const languages = [
    { key: "vi", value: "Tiếng Việt" },
    {
      key: "en",
      value: "English",
    },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.location.reload();
    console.log(
      languages.find((language) => language.key === i18n.language).value
    );
  };

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => changeLanguage("vi")}>
        Tiếng Việt
      </Menu.Item>
      <Menu.Item key="2" onClick={() => changeLanguage("en")}>
        English
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      <span className="cursor-pointer">
        {languages.find((language) => language.key === i18n.language).value}
        <i className="ml-1 fas fa-chevron-down"></i>
      </span>
    </Dropdown>
  );
}
