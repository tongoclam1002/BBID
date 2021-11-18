import { Card, Col, Row, Menu } from "antd";

export default function OrderPage() {
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
          <Card>
            <div className="box-order form-group">
              <p className="box-cart-shop">
                <strong>Rolex</strong> <i className="fas fa-angle-right"></i>
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th className="is-img">Hình ảnh</th>
                      <th className="no-break">Tên sản phẩm</th>
                      <th className="is-type">Loại</th>
                      <th className="is-count">Số lượng</th>
                      <th className="no-break">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img alt="product" width="100" src="img/product.jpg" />
                      </td>
                      <td>Rolex S1</td>
                      <td>
                        <span className="box-input">
                          <i className="fas fa-square-full is_brown"></i>
                        </span>
                      </td>
                      <td>1</td>
                      <td>
                        <strong>720,000đ</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
