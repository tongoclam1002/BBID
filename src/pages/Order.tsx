import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../interfaces/product.interface";
import { NavLink } from "react-router-dom";
import Api from "../services/api";
import Configuration from "../services/configuration";

export default function ProductDetail() {
  const { id }: any = useParams();
  const api = new Api();
  const config = new Configuration();
  const [product, setProduct] = useState<product>();
  const [isMomo, setIsMomo] = useState(false);

  useEffect(() => {
    api.get(config.GET_PRODUCT_DETAIL_URL + id).then((product) => {
      setProduct(product);
    });
  }, []);

  function changeMethod() {
    setIsMomo(!isMomo);
  }

  return (
    <div className="row">
      <div className="col-12">
        <h4>Đơn hàng của bạn</h4>
        <div className="box-order">
          <p className="form-group clearfix">
            <strong>Địa chỉ nhận hàng</strong>
            <span className="float-right">
              <a href="#">Thay đổi</a>
            </span>
          </p>
          <p>Lê Lý </p>
          <p>SĐT: +(08) 9645452454</p>
          <p>
            Địa chỉ: 12 Phạm Văn Đồng, phường 12, quận Gò Vấp, tp.Hồ Chí Minh{" "}
          </p>
        </div>
        <div className="box-order">
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
                  <th className="is-type">Loại</th>
                  <th className="is-count">Số lượng</th>
                  <th className="no-break">Tạm tính</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      alt="product"
                      width="100"
                      src={product?.image}
                    />
                  </td>
                  <td>{product?.name}</td>
                  <td>
                    <span className="box-input">
                      <i className="fas fa-square-full is_brown"></i>
                    </span>
                  </td>
                  <td>1</td>
                  <td>
                    <strong>{product?.price.toLocaleString("vi-VN")}đ</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Lời nhắc: </p>
          <p className="form-group">
            <textarea className="form-control form-control-sm"></textarea>
          </p>
        </div>
        <div className="box-order">
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
        </div>
        <div className="box-order">
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
        </div>
        <div className="box-order form-group">
          <p className="clearfix">
            Tổng tiền hàng
            <span className="float-right">720,000đ</span>
          </p>
          <p className="form-group clearfix">
            Tổng tiền vận chuyển
            <span className="float-right">50,000đ</span>
          </p>
          <p className="border-top pt-2 clearfix">
            <strong>Tổng thanh toán</strong>
            <span className="float-right">
              <strong className="is_red">770,000đ</strong>
            </span>
          </p>
        </div>
        {!isMomo && (
          <p className="form-group text-center">
            <NavLink
              className="btn btn-primary green"
              to="success"
              role="button"
            >
              Xác nhận đặt hàng
            </NavLink>
          </p>
        )}
        {isMomo && (
          <p className="form-group text-center">
            <NavLink
              className="btn btn-primary green"
              to={`payment/${id}`}
              role="button"
            >
              Xác nhận đặt hàng
            </NavLink>
          </p>
        )}
      </div>
    </div>
  );
}
