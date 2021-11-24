import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Button, Card, Checkbox, Col, Empty, Row } from "antd";
import CartSkeleton from "./CartSkeleton";
import { history } from "../..";
import toast from "../../app/utils/toast";
import { selelctAllItemInStore } from "./cartSlice";
import GoBackButton from "../../components/GoBackButton";
import { t } from "i18next";

export default function CartPage() {
  const { cart, status, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  function onCheckout() {
    let selectedItem = [];
    cart?.storeList.forEach((store) => {
      store.productList.forEach((product) => {
        if (product.isSelected === true) selectedItem.push(product);
      });
    });
    selectedItem.length > 0
      ? history.push("/checkout")
      : toast.warning(t("message.EMPTY_CART_ITEM_SELECTED"), 0.5);
  }

  if (status.includes("pendingFetchCart")) return <CartSkeleton />;

  return (
    <Row gutter={10}>
      <Col span={24} style={{ paddingBottom: "80px" }}>
        {cart?.storeList.length > 0 ? (
          cart.storeList.map((store, key) => (
            <Card key={key} className="mb-4">
              <p className="box-cart-shop clearfix">
                <Checkbox
                  checked={store.isSelected}
                  onChange={() =>
                    dispatch(selelctAllItemInStore(store.storeId))
                  }
                  className="mr-2"
                ></Checkbox>
                <Link to={`/store/${store.storeId}`}>{store.storeId}</Link>{" "}
                <i className="fas fa-angle-right"></i>
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="img-td">{t("product.IMAGE")}</th>
                      <th className="w-15vw">{t("product.PRODUCT_NAME")}</th>
                      <th>{t("product.QUANTITY")}</th>
                      <th>{t("product.UNIT_PRICE")}</th>
                      <th>{t("product.PRICE")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {store?.productList?.map((item, key) => (
                      <CartItem key={key} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))
        ) : (
          <Card className="mb-4">
            <Empty description={t("message.EMPTY_PRODUCT_IN_CART")} />
          </Card>
        )}
      </Col>
      <Col span={24} id="checkout-info">
        <Card className="box-total" id="checkout-info">
            <Row className="container">
              <Col lg={16} md={24} sm={24}>
                <div style={{ textAlign: "right", marginRight: "24px" }}>
                  <h4>{t("order.ORDER_INFORMATION")}</h4>
                  <div>
                  {t("order.TOTAL_PRICE")}:{" "}
                    <strong>{totalPrice?.toLocaleString("vi-VN")}đ</strong>
                  </div>
                </div>
              </Col>
              <Col lg={8} md={24} sm={24} style={{ alignSelf: "center" }}>
                <Button
                  size="large"
                  className="btn btn-primary green text-white text-uppercase w-100 font-weight-bold"
                  onClick={() => onCheckout()}
                >
                  {t("order.CHECKOUT")}
                </Button>
              </Col>
            </Row>
        </Card>
      </Col>
    </Row>
  );
}
