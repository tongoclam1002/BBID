import { Link, NavLink } from "react-router-dom";

export default function BreadCrumbs({ crumbs }) {
  // Don't render a single breadcrumb.
  return (
    <div className="box-nav">
      <ul className="nav">
        {/* Link back to any previous steps of the breadcrumb. */}
        {crumbs.length <= 1 ? (
          <li className="nav-item">
            <span className="nav-link">Trang chủ</span>
          </li>
        ) : (
          crumbs.map(({ title, path }, key) =>
            key + 1 === crumbs.length ? (
              <li key={key} className="nav-item">
                <span className="nav-link">{title}</span>
              </li>
            ) : (
              <li key={key} className="nav-item">
                <Link to={path} className="nav-link">
                  {title}
                </Link>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}
