import { Link } from "react-router-dom"
import CartItem from "./CartItem";
import { useAppSelector } from "../../app/store/configureStore";
import { Button, Card, Col, Empty, Row } from "antd";
import { groupBy } from "../../app/utils/utils";
import constant from "../../app/utils/constant";
import CartSkeleton from "./CartSkeleton";

export default function CartPage() {
  const { cart, status } = useAppSelector(state => state.cart);
  const groupByStoreItem = cart ? groupBy(cart?.productLists, "storeId") : [];
  const itemCount = cart?.productLists.reduce((sum, item) => sum + item.price, 0)

  if (status.includes("pending"))
    return <CartSkeleton />

  return (
    <Row gutter={10}>
      <Col lg={16} md={24}>
        {groupByStoreItem.length ? groupByStoreItem.map((store, key) => (
          <Card key={key} className="mb-4">
            <p className="box-cart-shop clearfix">
              <input type="checkbox" value="" /><Link to={`/store/${store.storeId}`}>{store.storeId}</Link> <i className="fas fa-angle-right"></i>
            </p>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="is-checkbox"><input type="checkbox" value="" /></th>
                    <th className="is-img">Hình ảnh</th>
                    <th className="no-break">Tên sản phẩm</th>
                    <th className="is-count">Số lượng</th>
                    <th className="no-break">Tạm tính</th>
                    <th className="no-break"></th>
                  </tr>
                </thead>
                <tbody>
                  {store?.list?.map((item, key) => (
                    <CartItem key={key} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </Card>)) : <Card className="mb-4"><Empty description={constant.text.EMPTY_PRODUCT_IN_CART} /></Card>}
        <Link to="/" className="btn btn-primary green">Tiếp tục mua sắm</Link>
      </Col>
      <Col lg={8} md={24}>
        <Card className="box-total">
          <h4>Thông tin đơn hàng</h4>
          <p>Tổng tiền: <strong>{itemCount?.toLocaleString("vi-VN")}đ</strong></p>
          {/* <Link to="/order" className="btn btn-primary green" role="button">Tiến hành đặt hàng</Link> */}
          <Button className="btn btn-primary green text-white">Tiến hành đặt hàng</Button>
        </Card>
      </Col>
    </Row>
  )
}