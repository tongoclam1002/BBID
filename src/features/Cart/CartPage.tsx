import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import CartItem from "./CartItem";
import { useAppSelector } from "../../app/store/configureStore";
import api from "../../app/api/api";
import { Card, Col, Row, Space } from "antd";
import { groupBy } from "../../app/utils/utils";

export default function CartPage() {
  const { cart } = useAppSelector(state => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const groupByStoreItem = cart ? groupBy(cart?.productLists, "storeId") : [];
  const itemCount = cart?.productLists.reduce((sum, item) => sum + item.price, 0)

  return (
    <Row gutter={10}>
      <Col lg={16} md={24}>

        {groupByStoreItem?.map((store, key) => (
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
          </Card>))}

        <Link to="/" className="btn btn-primary green">Tiếp tục mua sắm</Link>

      </Col>
      <Col lg={8} md={24}>
        <Card className="box-total">
          <h4>Thông tin đơn hàng</h4>
          <p>Tổng tiền: <strong>{itemCount?.toLocaleString("vi-VN")}đ</strong></p>
          <p><a className="btn btn-primary green" href="#test" role="button">Tiến hành đặt hàng</a></p>
        </Card>

      </Col>
    </Row>
  )
}