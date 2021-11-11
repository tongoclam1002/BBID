import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import CartItem from "./CartItem";
import { useAppSelector } from "../../app/store/configureStore";
import api from "../../app/api/api";

export default function CartPage() {
  const { cart } = useAppSelector(state => state.cart);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.Cart.get().catch(error => console.log(error)).finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="row">
      <div className="col-12">
        <div className="clearfix">
          <div className="box-cart-left">
            <p className="box-cart-shop clearfix">
              <input type="checkbox" value="" /><a href="#">Rolex</a> <i className="fas fa-angle-right"></i>
              {/* <span className="float-right"><a href="#">Sửa</a></span> */}
            </p>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="is-checkbox"><input type="checkbox" value="" /></th>
                    <th className="is-img">Hình ảnh</th>
                    <th className="no-break">Tên sản phẩm</th>
                    <th className="is-type">Loại</th>
                    <th className="is-count">Số lượng</th>
                    <th className="no-break">Tạm tính</th>
                    <th className="no-break"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.productLists?.map(item => (
                    <CartItem item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="box-cart-right">
            <div className="box-total">
              <h4>Thông tin đơn hàng</h4>
              <p>Tổng tiền: <strong>720,000đ</strong></p>
              <p><a className="btn btn-primary green" href="#test" role="button">Tiến hành đặt hàng</a></p>
            </div>
          </div>
        </div>
        <Link to="/" className="btn btn-primary green">Tiếp tục mua sắm</Link>
      </div>
    </div>
  )
}