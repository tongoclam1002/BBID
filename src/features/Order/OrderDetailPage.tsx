import { Card } from "antd";

export default function OrderDetailPage() {
  return (
    <Card>
      <h4>Thông tin đơn hàng</h4>
      <div className="box-order">
        <p className="form-group clearfix">
          Mã đơn hàng
          <span className="float-right">
            <strong>MSV1233141</strong>
          </span>
        </p>
        <p>
          <strong>Đơn hàng đang chuẩn bị</strong>
        </p>
        <p>Dự kiến giao vào ngày 22/10/2021 vào lúc 15h</p>
      </div>
      <div className="box-order">
        <div className="box-progress form-group">
          <div className="box-step">
            <div className="is-stepbar">
              <span className="is-stepbar-circle"></span>
              <span className="is-stepbar-line"></span>
            </div>
            <div className="is-stepinfo">
              <p>
                <strong>Đơn hàng đang lấy hàng</strong>
              </p>
              <p>Dự kiến vào ngày 22/10/2021</p>
            </div>
          </div>
          <div className="box-step pass">
            <div className="is-stepbar">
              <span className="is-stepbar-circle"></span>
              <span className="is-stepbar-line"></span>
            </div>
            <div className="is-stepinfo">
              <p>Xác nhận</p>
            </div>
          </div>
          <div className="box-step pass first">
            <div className="is-stepbar">
              <span className="is-stepbar-circle"></span>
              <span className="is-stepbar-line"></span>
            </div>
            <div className="is-stepinfo">
              <p>Chờ xác nhận</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Địa chỉ nhận hàng</strong>
        </p>
        <p>Lê Lý </p>
        <p>SĐT: +(08) 9645452454</p>
        <p>
          Địa chỉ: 12 Phạm Văn Đồng, phường 12, quận Gò Vấp, tp.Hồ Chí Minh{" "}
        </p>
      </div>
      <div className="box-order">
        <p className="form-group">
          <strong>Sản phẩm</strong>
        </p>
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
                <th className="no-break">Tạm tính</th>
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
        <p>Lời nhắc: </p>
      </div>
      <div className="box-order">
        <p className="form-group">
          <strong>Thời gian nhận hàng</strong>
        </p>
        <div className="row">
          <div className="col-md-6 col-sm-12 sm-mb-15">Ngày 22/10/2021</div>
          <div className="col-md-6 col-sm-12">15h</div>
        </div>
      </div>
      <div className="box-order">
        <p className="form-group">
          <strong>Hình thức thanh toán</strong>
        </p>
        <p>Thanh toán COD</p>
      </div>
      <div className="box-order form-group">
        <p className="clearfix">
          Tổng tiền hàng
          <span className="float-right">720,000đ</span>
        </p>
        <p className="form-group clearfix">
          Tổng tiền vận chuyển
          <span className="float-right">50,000đ</span>
        </p>
        <p className="border-top pt-2 clearfix">
          <strong>Tổng thanh toán</strong>
          <span className="float-right">
            <strong className="is_red">770,000đ</strong>
          </span>
        </p>
      </div>
      <p className="form-group text-center">
        <a className="btn btn-primary green" href="#test" role="button">
          Hủy đơn
        </a>
      </p>
    </Card>
  );
}
