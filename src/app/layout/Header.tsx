import { Button } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { filterProductAsync } from "../../features/Product/searchSlice";
// import DropdownLanguage from "../../components/DropdownLanguage";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

export default function Header({ showModal }) {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = cart?.storeList?.reduce(
    (sum, item) => sum + item.productList.length,
    0
  );

  const [query, setQuery] = useState("");
  const hits = useAppSelector((state) => state.search.hits);
  const results = useAppSelector((state) => state.search.searchResults);
  const dispatch = useAppDispatch();

  function onSearch(e) {
    setQuery(e.target.value);
    dispatch(
      filterProductAsync({
        productKeyword: query,
        categoryIds: [],
        SortType: "Newest",
        PageNumber: 1,
        PageSize: 5,
      })
    );
  }

  return (
    <div id="header" className="clearfix">
      <div className="container">
        {/* <div className="top-header">
          <DropdownLanguage />
        </div> */}
        <div className="box-logo">
          <NavLink to="/">
            <strong>GigaMall</strong>
          </NavLink>
        </div>
        <div className="box-icon clearfix">
          <ul>
            <li className="is-notification">
              <Link to="/cart">
                <i className="fas fa-shopping-cart"></i>
                <em>{itemCount ? itemCount : 0}</em>
              </Link>
            </li>
            {user ? (
              <SignedInMenu />
            ) : (
              <li>
                <Button
                  className="primary-color"
                  type="link"
                  onClick={showModal}
                >
                  {t("auth.SIGN_IN")}
                </Button>
              </li>
            )}
          </ul>
        </div>
        <div className="box-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={t("header.INPUT_SEARCH")}
              onChange={(e) => onSearch(e)}
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
