import { Card, Col, Row, Menu } from "antd";
import { useEffect, useState } from "react";
import api from "../../app/api/api";

export default function OrderPage() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    api.Order.list().then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      {" "}
      <Card className="box-process mb-4 w-100">
        <div className="row">
          <div className="col-md-3 col-sm-6 sm-mb-15">
            <div className="box-status">
              <i className="fas fa-clipboard-check green"></i>
            </div>
            <p>Xác nhận</p>
          </div>
          <div className="col-md-3 col-sm-6 sm-mb-15">
            <div className="box-status">
              <i className="fas fa-archive"></i>
              {/* <em>1</em> */}
            </div>
            <p>Chờ lấy hàng</p>
          </div>
          <div className="col-md-3 col-sm-6 sm-mb-15">
            <div className="box-status">
              <i className="fas fa-truck"></i>
            </div>
            <p>Đang vận chuyển</p>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="box-status">
              <i className="fas fa-star"></i>
            </div>
            <p>Đánh giá</p>
          </div>
        </div>
      </Card>
      <Row>
        <Col span={24}>
          {orders?.map((order, key) => (
            <Card key = {key} className="mb-2">
              <div className="box-order form-group">
                {/* <p className="box-cart-shop">
                  <strong>Rolex</strong> <i className="fas fa-angle-right"></i>
                </p> */}
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="img-td">Hình ảnh</th>
                        <th className="w-15vw">Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.productOrders.map((product, key) => (
                        <tr key = {key}>
                          <td>
                            <img
                              alt="product"
                              width="100"
                              src={product.mediaLink}
                            />
                          </td>
                          <td>{product.name}</td>
                          {/* <td>
                            <span className="box-input">
                              <i className="fas fa-square-full is_brown"></i>
                            </span>
                          </td> */}
                          <td>{product.quantity}</td>
                          <td>
                            <strong>{(product.quantity * product.price).toLocaleString("vi-VN")}đ</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
}
