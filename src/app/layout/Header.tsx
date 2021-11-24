import { Dropdown, Menu } from "antd";
import { t } from "i18next";
import { Link, NavLink } from "react-router-dom";
import DropdownLanguage from "../../components/DropdownLanguage";
import { useAppSelector } from "../store/configureStore";

export default function Header() {
  const { cart } = useAppSelector((state) => state.cart);
  const itemCount = cart?.storeList?.reduce(
    (sum, item) => sum + item.productList.length,
    0
  );
  const menu = (
    <Menu className="bg-white">
      <Menu.Item key="1">
        <Link to="/order">{t("profileMenu.ORDER")}</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div id="header" className="clearfix">
      <div className="container">
        <div className="top-header">
          <DropdownLanguage />
        </div>
        <div className="box-logo">
          {/* <a href="#test"><i className="fas fa-bars"></i></a> */}
          <NavLink to="/">
            <strong>GigaMall</strong>
          </NavLink>
        </div>
        <div className="box-icon clearfix">
          <ul>
            {/* <li>
              <i className="fas fa-heart"></i>
            </li> */}
            <li className="is-notification">
              <Link to="/cart">
                <i className="fas fa-shopping-cart"></i>
                <em>{itemCount ? itemCount : 0}</em>
              </Link>
            </li>
            <li className="is-user cursor-pointer">
              <Dropdown overlay={menu} trigger={["click"]}>
                <i className="fas fa-user-circle"></i>
              </Dropdown>
            </li>
          </ul>
        </div>
        <div className="box-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={t("header.INPUT_SEARCH")}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-primary green search-btn"
                type="button"
              >
                <i className="fas fa-search"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
