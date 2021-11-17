import { Button, Card } from "antd";
import { addCartItemAsync } from "../Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { history } from "../..";

export default function ProductDetail({ product }) {
  const { status } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  function handlePurchaseItem(productId: number) {
    // debugger;
    dispatch(addCartItemAsync({ productId: product.productId }));
    history.push(`/cart`)
  }

  return (
    <>
      {product && (
        <div className="box-shop">
          <Card className="mb-3">
            <div className="row">
              <div className="col-md-6 col-sm-5">
                <p className="box-product-img">
                  <img
                    alt="logo1"
                    src={product?.image}
                  />
                </p>
              </div>
              <div className="col-md-6 col-sm-7 box-info d-flex flex-column justify-content-between">
                <div>
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
                      <a className="link360" href={process.env.REACT_APP_VIRTUAL_MALL_URL} role="button" target="_blank" rel="noreferrer">
                        360<sup>o</sup>
                      </a>
                    </span>
                  </h4>
                  <div className="title">
                    <strong>
                      {product.price > 0
                        ? product.price.toLocaleString("vi-VN")
                        : 0}
                      đ
                    </strong>
                  </div>
                </div>
                <div style={{ paddingBottom: '60px' }}>
                  <Button
                    className="btn btn-primary green text-white text-uppercase font-weight-bold"
                    size='large'
                    onClick={() => handlePurchaseItem(product?.productId)}
                  >
                    Mua ngay
                  </Button>
                  <Button
                    className="icon-cart"
                    size="large"
                    icon={<i className="fas fa-cart-plus"></i>}
                    loading={status.includes('pendingAddItem' + product.productId)}
                    onClick={() => dispatch(addCartItemAsync({ productId: product.productId }))}
                    style={{color: '#70b775'}}
                    ghost />
                </div>
                {/* <p className="box-btn">
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
              </p> */}
              </div>
            </div>
          </Card>


          <Card title="CHI TIẾT SẢN PHẨM">
            <div className="row">
              <div className="col-12">
                <p>{product.description}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
