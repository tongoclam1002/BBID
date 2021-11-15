import { Button, Card, Collapse, Space } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { setCart } from "../Cart/cartSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import api from "../../app/api/api";
import toast from "../../app/utils/toast";
import constant from "../../app/utils/constant";

export default function ProductDetail({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  function handleAddItem(productId: number) {
    setIsLoading(true);
    api.Cart.addItem(productId)
      .then(() => {
        toast.success(constant.text.ADD_CART_ITEM_SUCCESS_MESSAGE, 0.5);
        api.Cart.get().then(cart => dispatch(setCart(cart.data)))
      }
      )
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
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
                        <a className="link360" href="http://malldemo.bbid.vn/" role="button" target="_blank">
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
                    {/* <Collapse ghost>
                  <CollapsePanel header="Chi tiết" key="1">
                    <p>{product.description}</p>
                  </CollapsePanel>
                </Collapse> */}
                  </div>
                  <div style={{paddingBottom: '60px'}}>
                    <NavLink
                      className="btn btn-primary green is-bigger"
                      href="#test"
                      role="button"
                      to={`/order/${product?.productId}`}
                    >
                      Mua ngay
                    </NavLink>
                    <Button className="icon-cart" size="large" icon={<i className="fas fa-cart-plus"></i>} loading={isLoading} onClick={() => handleAddItem(product.productId)} ghost>

                    </Button>
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
