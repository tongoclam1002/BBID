import { Link } from "react-router-dom"
import CartItem from "./CartItem";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Button, Card, Checkbox, Col, Empty, Row } from "antd";
import { getTotalPriceInCart, groupBy } from "../../app/utils/utils";
import constant from "../../app/utils/constant";
import CartSkeleton from "./CartSkeleton";
import { history } from "../..";
import toast from "../../app/utils/toast";
import { selectItem, selelctAllItemInStore } from "./cartSlice";

export default function CartPage() {
  const { cart, status, selectedStores } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const totalPrice = getTotalPriceInCart(selectedStores);

  function onCheckout() {
    let selectedItem = [];
    cart?.storeList.forEach(store => {
      store.productList.forEach(product => {
        if (product.isSelected === true) selectedItem.push(product)
      })
    });
    selectedItem.length > 0 ? history.push('/checkout') : toast.warning(constant.text.EMPTY_CART_ITEM_SELECTED, 0.5);
  }

  if (status.includes("pendingFetchCart"))
    return <CartSkeleton />

  return (
    <Row gutter={10}>
      <Col span={24} style={{ paddingBottom: "80px" }}>
        {cart?.storeList.length > 0 ? cart.storeList.map((store, key) => (
          <Card key={key} className="mb-4">
            <p className="box-cart-shop clearfix">
              <Checkbox checked={store.isSelected} onChange={() => dispatch(selelctAllItemInStore(store.storeId))} className="mr-2"></Checkbox>
              <Link to={`/store/${store.storeId}`}>{store.storeId}</Link> <i className="fas fa-angle-right"></i>
            </p>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="is-checkbox"></th>
                    <th className="is-img">Hình ảnh</th>
                    <th className="no-break">Tên sản phẩm</th>
                    <th className="is-count">Số lượng</th>
                    <th className="is-count">Đơn giá</th>
                    <th className="no-break">Tạm tính</th>
                    <th className="no-break"></th>
                  </tr>
                </thead>
                <tbody>
                  {store?.productList?.map((item, key) => (
                    <CartItem key={key} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </Card>)) : <Card className="mb-4"><Empty description={constant.text.EMPTY_PRODUCT_IN_CART} /></Card>}
        {/* <Link to="/" className="btn btn-primary green">Tiếp tục mua sắm</Link> */}
      </Col>
      <Col span={24} id="checkout-info">
        <Card className="box-total" id="checkout-info">
          <div className="container">
            <Row>
              <Col span={16}>
                <div style={{ textAlign: "right", marginRight: "24px" }}>
                  <h4>Thông tin đơn hàng</h4>
                  <p>Tổng tiền: <strong>{totalPrice?.toLocaleString("vi-VN")}đ</strong></p>
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
          </div>
          {/* <Button className="btn btn-primary green text-white">Tiến hành đặt hàng</Button> */}
        </Card>
      </Col>
    </Row>
  )
}