import { Button, Card, Select } from "antd";
import { addCartItemAsync } from "../Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { t } from "i18next";
import { useState } from "react";
import { ProductDetail as ProductDetailInterface } from "../../app/interfaces/product.interface";
import toast from "../../app/utils/toast";

// import { history } from "../..";

export default function ProductDetail({ product }) {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { Option } = Select;
  const [productDetailIdSelected, setproductDetailIdSelected] = useState();
  const [productDetailSelected, setproductDetailSelected] =
    useState<ProductDetailInterface>();

  function handlePurchaseItem() {
    if (productDetailIdSelected) {
      dispatch(
        addCartItemAsync({
          productId: product.productId,
          productDetailId: productDetailIdSelected,
        })
      );
      window.open(`/cart`);
    } else {
      toast.warning(t("message.EMPTY_PRODUCT_TYPE"), 0.5);
    }
  }

  function addProductToCart() {
    if (productDetailIdSelected) {
      dispatch(
        addCartItemAsync({
          productId: product.productId,
          productDetailId: productDetailIdSelected,
        })
      );
    } else {
      toast.warning(t("message.EMPTY_PRODUCT_TYPE"), 0.5);
    }
  }

  function handleChange(value) {
    setproductDetailIdSelected(value);
    setproductDetailSelected(
      product.productDetails.find((detail) => detail.productDetailId === value)
    );
  }

  return (
    <>
      {product && (
        <div className="box-shop">
          <Card className="mb-3">
            <div className="row">
              <div className="col-md-6 col-sm-5">
                <p className="box-product-img">
                  <img alt="logo1" src={product?.image} />
                </p>
              </div>
              <div className="col-md-6 col-sm-7 box-info d-flex flex-column justify-content-between">
                <div>
                  <h4 className="clearfix">
                    <span className="float-left">
                      {product?.name}
                      <br />
                      {/* <span className="box-rate">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <em>(123 bình luận)</em>
                      </span> */}
                    </span>
                    {/* <span className="float-right box-link360">
                      <a
                        className="link360"
                        href={process.env.REACT_APP_VIRTUAL_MALL_URL}
                        role="button"
                        target="_blank"
                        rel="noreferrer"
                      >
                        360<sup>o</sup>
                      </a>
                    </span> */}
                  </h4>
                  <div className="title">
                    <strong>
                      {productDetailSelected
                        ? productDetailSelected.price > 0
                          ? productDetailSelected.price.toLocaleString("vi-VN")
                          : 0
                        : product.price > 0
                        ? product.price.toLocaleString("vi-VN")
                        : 0}
                      đ
                    </strong>
                  </div>
                  <div className="mt-3">
                    <strong>{t("common.DETAILS")}</strong>
                    <div className="mt-2 mb-4">{product.description}</div>
                    <Select
                      defaultValue="Chọn loại"
                      style={{ width: 200 }}
                      onChange={handleChange}
                      className="mb-2"
                    >
                      {product.productDetails?.map((detail, key) => (
                        <Option key={key} value={detail.productDetailId}>{`${
                          detail.color ? detail.color : ""
                        } ${detail.size && detail.color ? "-" : ""} ${
                          detail.size ? detail.size : ""
                        }`}</Option>
                      ))}
                    </Select>
                  </div>
                  {/* <Collapse defaultActiveKey={["1"]} ghost>
                    <Collapse.Panel header="Chi tiết" key="1">
                      
                    </Collapse.Panel>
                  </Collapse> */}
                </div>
                <div style={{ paddingBottom: "60px" }}>
                  <Button
                    className="btn btn-primary green text-white text-uppercase font-weight-bold"
                    size="large"
                    onClick={() => handlePurchaseItem()}
                  >
                    {t("common.BUY_NOW")}
                  </Button>
                  <Button
                    className="icon-cart"
                    size="large"
                    icon={<i className="fas fa-cart-plus"></i>}
                    loading={status.includes(
                      "pendingAddItem" + product.productId
                    )}
                    onClick={() => addProductToCart()}
                    style={{ color: "#70b775" }}
                    ghost
                  />
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
        </div>
      )}
    </>
  );
}
