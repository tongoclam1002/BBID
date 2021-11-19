import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Button, Card, Checkbox, Col, Empty, Row } from "antd";
import constant from "../../app/utils/constant";
import CartSkeleton from "./CartSkeleton";
import { history } from "../..";
import toast from "../../app/utils/toast";
import { selelctAllItemInStore } from "./cartSlice";

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
      : toast.warning(constant.text.EMPTY_CART_ITEM_SELECTED, 0.5);
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
                      <th className="img-td">Hình ảnh</th>
                      <th className="w-15vw">Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Tạm tính</th>
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
            <Empty description={constant.text.EMPTY_PRODUCT_IN_CART} />
          </Card>
        )}
      </Col>
      <Col span={24} id="checkout-info">
        <Card className="box-total" id="checkout-info">
            <Row className="container">
              <Col span={16}>
                <div style={{ textAlign: "right", marginRight: "24px" }}>
                  <h4>Thông tin đơn hàng</h4>
                  <div>
                    Tổng tiền:{" "}
                    <strong>{totalPrice?.toLocaleString("vi-VN")}đ</strong>
                  </div>
                </div>
              </Col>
              <Col span={8} style={{ alignSelf: "center" }}>
                <Button
                  size="large"
                  className="btn btn-primary green text-white text-uppercase w-100 font-weight-bold"
                  onClick={() => onCheckout()}
                >
                  Tiến hành đặt hàng
                </Button>
              </Col>
            </Row>
        </Card>
      </Col>
    </Row>
  );
}
