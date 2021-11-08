import { Link, NavLink } from "react-router-dom";

export default function BreadCrumbs({ crumbs }) {
  // Don't render a single breadcrumb.
  return (
    <div className="box-nav">
      <ol className="breadcrumb">
        {/* Link back to any previous steps of the breadcrumb. */}
        {crumbs.length <= 1 ? (
          <li className="breadcrumb-item">
            <span>Trang chủ</span>
          </li>
        ) : (
          crumbs.map(({ title, path }, key) =>
            key + 1 === crumbs.length ? (
              <li key={key} className="breadcrumb-item">
                <span>{title}</span>
              </li>
            ) : (
              <li key={key} className="breadcrumb-item">
                <Link to={path}>
                  {title}
                </Link>
              </li>
            )
          )
        )}
      </ol>
    </div>
  );
}
