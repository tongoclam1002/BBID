import { NavLink } from "react-router-dom";
export default function BreadCrumbs() {
  return (
    <div className="box-nav">
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Trang chủ
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
