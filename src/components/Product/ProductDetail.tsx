import { NavLink } from "react-router-dom";
import { product } from "../../interfaces/product.interface";

export default function ProductDetail({product}) {
  return (
    <>
      {product && (
        <div className="box-shop">
          <div className="row">
            <div className="col-md-6 col-sm-5">
              <p className="box-product-img">
                <img
                  alt="logo1"
                  src={product?.image}
                />
              </p>
            </div>
            <div className="col-md-6 col-sm-7 box-info">
              <h4 className="clearfix">
                <span className="float-left">
                  {product?.name}
                  <br />
                  <span className="box-rate">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <em>(123 bình luận)</em>
                  </span>
                </span>
                <span className="float-right box-link360">
                  <a className="link360" href="http://malldemo.bbid.vn/" role="button" target="_blank">
                    360<sup>o</sup>
                  </a>
                </span>
              </h4>
              <p className="title">
                <strong>
                  {product.price > 0
                    ? product.price.toLocaleString("vi-VN")
                    : 0}
                  đ
                </strong>
              </p>
              <div>
                <a className="link-showdhide">
                <i className="fas fa-angle-right"></i> Chi tiết
                </a>
              </div>
              <div className="box-display">
                <p>{product.description}</p>
              </div>
              <div>
                <a className="link-showdhide">
                  <i className="fas fa-angle-right"></i> Nổi bật
                </a>
              </div>
              <div className="box-display">
                <p>Nội dung..</p>
              </div>
              <div className="row box-input">
                <div className="col-3">
                  <select className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div className="col-9 box-select">
                  <i className="fas fa-square-full is_gray"></i>
                  <i className="fas fa-square-full is_brown"></i>
                </div>
              </div>
              <p>
                <NavLink
                  className="btn btn-primary green is-bigger"
                  href="#test"
                  role="button"
                  to={`/order/${product?.productId}`}
                >
                  Mua ngay
                </NavLink>
                <a className="icon-cart" href="#test">
                  <i className="fas fa-cart-plus"></i>
                </a>
              </p>
              <p className="box-btn">
                <a
                  className="btn red sm-mb-15 sm-block"
                  href="#test"
                  role="button"
                >
                  <i className="fas fa-heart"></i>Thêm vào yêu thích
                </a>
                <a className="btn turquoise" href="#test" role="button">
                  <i className="fas fa-exchange-alt"></i>So sánh
                </a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      )}
    </>
  );
}
