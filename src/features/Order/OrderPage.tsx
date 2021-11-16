import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../app/interfaces/product.interface";
import api from "../../app/api/api";
import OrderItem from "./OrderItem";
import { Card } from "antd";
import AddressForm from "./AddressForm";
import { useAppSelector } from "../../app/store/configureStore";

export default function OrderPage() {
  const { productId }: any = useParams();
  const [product, setProduct] = useState<Product>();
  const [isMomo, setIsMomo] = useState(false);
  const { cart, status } = useAppSelector(state => state.cart);
  let productList = cart?.productLists.filter(product => product.isSelected === true);
  const totalProductPrice = productList?.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalShippingFee = 50000;
  const totalPrice = totalProductPrice + totalShippingFee

  useEffect(() => {
    if (productId) {
      api.Product.details(productId).then(response => setProduct(response.data))
    }
  }, [productId]);

  function changeMethod() {
    setIsMomo(!isMomo);
  }

  return (
    <div className="row">
      <div className="col-12">
        <Card className="box-order">
          <h4 className="mb-4">Đơn hàng của bạn</h4>
          <Card className="mb-4">
            <p className="form-group clearfix">
              <strong>Địa chỉ nhận hàng</strong>
              {/* <span className="float-right">
                <a href="#">Thay đổi</a>
              </span> */}
            </p>
            {/* <p>Lê Lý </p>
            <p>SĐT: +(08) 9645452454</p>
            <p>
              Địa chỉ: 12 Phạm Văn Đồng, phường 12, quận Gò Vấp, tp.Hồ Chí Minh{" "}
            </p> */}
            <AddressForm />
          </Card>
          <Card>
            <p className="form-group">
              <strong>Sản phẩm</strong>
            </p>
            <p className="box-cart-shop">
              <strong>Rolex</strong> <i className="fas fa-angle-right"></i>
            </p>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="is-img">Hình ảnh</th>
                    <th className="no-break">Tên sản phẩm</th>
                    {/* <th className="is-type">Loại</th> */}
                    <th className="is-count">Số lượng</th>
                    <th className="no-break">Tạm tính</th>
                  </tr>
                </thead>
                <tbody>
                  {productList?.map(product => (
                    <OrderItem item={product} />
                  ))}
                </tbody>
              </table>
            </div>
            <p>Lời nhắc: </p>
            <p className="form-group">
              <textarea className="form-control form-control-sm"></textarea>
            </p>
          </Card>
        </Card>
        <Card className="box-order">
          <p className="form-group">
            <strong>Thời gian nhận hàng</strong>
          </p>
          <div className="row form-group">
            <div className="col-md-6 col-sm-12 sm-mb-15">
              <select className="form-control">
                <option>Chọn ngày</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="col-md-6 col-sm-12">
              <select className="form-control">
                <option>Thời gian giao nhận</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
        </Card>
        <Card className="box-order">
          <p className="form-group">
            <strong>Hình thức thanh toán</strong>
          </p>
          {/* <div className="form-check">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" />
          <label className="form-check-label" htmlFor="gridRadios1">
            Thanh toán bằng thẻ
          </label>
        </div> */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gridRadios"
              id="gridRadios2"
              value="option2"
              onChange={changeMethod}
            />
            <label className="form-check-label" htmlFor="gridRadios2">
              Thanh toán bằng ví Momo
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gridRadios"
              id="gridRadios3"
              value="option3"
              defaultChecked
              onChange={changeMethod}
            />
            <label className="form-check-label" htmlFor="gridRadios3">
              Thanht toán COD
            </label>
          </div>
        </Card>
        <Card className="box-order form-group">
          <p className="clearfix">
            Tổng tiền hàng
            <span className="float-right">{totalProductPrice?.toLocaleString("vi-VN")}đ</span>
          </p>
          <p className="form-group clearfix">
            Tổng tiền vận chuyển
            <span className="float-right">{totalShippingFee?.toLocaleString("vi-VN")}đ</span>
          </p>
          <p className="border-top pt-2 clearfix">
            <strong>Tổng thanh toán</strong>
            <span className="float-right">
              <strong className="is_red">{totalPrice?.toLocaleString("vi-VN")}đ</strong>
            </span>
          </p>
          <div className="text-center mt-5">
            {!isMomo && (
              <Link
                className="btn btn-primary green"
                to="success"
                role="button"
              >
                Xác nhận đặt hàng
              </Link>
            )}
            {isMomo && (
              <Link
                className="btn btn-primary green"
                to={`payment/${productId}`}
                role="button"
              >
                Xác nhận đặt hàng
              </Link>
            )}
          </div>

        </Card>

      </div>
    </div >
  );
}
