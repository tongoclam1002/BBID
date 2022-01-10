import { Dropdown, Menu } from "antd";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { signOut } from "../../features/Account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function SignedInMenu() {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const menu = (
    <Menu className="bg-white">
      <Menu.Item key="1">
        <Link to="/order">{t("profileMenu.ORDER")}</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => dispatch(signOut())}>
        {t("auth.SIGN_OUT")}
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <li className="is-user cursor-pointer">
        <Dropdown overlay={menu} trigger={["click"]}>
          <i className="fas fa-user-circle"></i>
        </Dropdown>
      </li>
    </>
  );
}
