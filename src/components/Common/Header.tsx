import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/configureStore";

export default function Header() {
  const { cart } = useAppSelector(state => state.cart);
  const itemCount = cart?.productLists.length;
  const quantityCount = cart?.productLists.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <div id="header" className="clearfix">
      <div className="box-logo">
        <a href="#test"><i className="fas fa-bars"></i></a>
        <NavLink to="/"><strong>GigaMall</strong></NavLink>
      </div>
      <div className="box-icon clearfix">
        <ul>
          <li><a href="#test"><i className="fas fa-heart"></i></a></li>
          <li className="is-notification"><Link to="/cart"><i className="fas fa-shopping-cart"></i><em>{itemCount}</em></Link></li>
          <li className="is-user"><a href="#test"><i className="fas fa-user-circle"></i><em>Lê Lý</em></a></li>
        </ul>
      </div>
      <div className="box-search">
        <div className="input-group">
          <span className="input-group-btn">
            <button className="btn btn-primary green" type="button">Tìm kiếm</button>
          </span>
          <input type="text" className="form-control" placeholder="Nhập từ khoá..." />
        </div>
      </div>
    </div>
  )
}