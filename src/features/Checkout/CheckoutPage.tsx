import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../app/api/api";
import CheckoutItem from "./CheckoutItem";
import { Button, Card, Empty } from "antd";
import AddressForm from "./AddressForm";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import constant from "../../app/utils/constant";
// import { getTotalPriceInCart } from "../../app/utils/utils";
import { history } from "../..";
import { fetchCartAsync } from "../Cart/cartSlice";
import toast from "../../app/utils/toast";

export default function CheckoutPage() {
  const { productId }: any = useParams();
  const [isMomo, setIsMomo] = useState(false);
  const { selectedCart, totalPrice: totalProductPrice} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  // const totalProductPrice = getTotalPriceInCart(selectedCart);
  const totalShippingFee = 50000;
  const totalPrice = totalProductPrice ? totalProductPrice : 0 + totalShippingFee

  function changeMethod() {
    setIsMomo(!isMomo);
  }

  const onFinish = (values: any) => {
    console.log(values.user);
    let productIds = [];
    selectedCart.forEach(store => {
      store.productList.forEach(product => {
        productIds.push(product.productId)
      })
    });
    const body = {
      addressTo: values.user.address,
      receiverName: values.user.name,
      receiverNNumber: values.user.phone,
      productList: productIds
    }
    api.Order.createOrder(body)
      .then(() => {
        history.push('/checkout/success');
        dispatch(fetchCartAsync());
      })
      .catch((error) => {
        console.log("Create order error: " + error)
      })
  };

  const onFinishFailed = () => {
    toast.warning(constant.text.EMPTY_CHECKOUT_INFO, 0.5)
  }

  return (
    <div className="row">
      <div className="col-12">
        <Card className="box-order">
          <h4 className="mb-4">Đơn hàng của bạn</h4>
          <Card className="mb-4">
            <p className="form-group clearfix">
              <strong>Địa chỉ nhận hàng</strong>
            </p>
            <AddressForm onFinish={onFinish} onFinishFailed={onFinishFailed}/>
          </Card>
          {selectedCart.length > 0 ? selectedCart.map((store, key) => (
            <Card key={key} className="mb-4">
              <p className="box-cart-shop clearfix">
                {store.storeId}
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th className="is-img">Hình ảnh</th>
                      <th className="no-break">Tên sản phẩm</th>
                      <th className="is-count">Số lượng</th>
                      <th className="no-break">Tạm tính</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store?.productList?.map((item, key) => (
                      <CheckoutItem key={key} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>

            </Card>)) : <Card className="mb-4"><Empty description={constant.text.EMPTY_SELECTED_PRODUCT_IN_CART} /></Card>}
          <p>Lời nhắc: </p>
          <p className="form-group">
            <textarea className="form-control form-control-sm"></textarea>
          </p>
        </Card>
        <Card className="box-order">
          <p className="form-group">
            <strong>Thời gian nhận hàng</strong>
          </p>
          <div className="row form-group">
            <div className="col-md-6 col-sm-12 sm-mb-15">
              <select className="form-control">
                <option>Chọn ngày</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="col-md-6 col-sm-12">
              <select className="form-control">
                <option>Thời gian giao nhận</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </div>
        </Card>
        <Card className="box-order">
          <p className="form-group">
            <strong>Hình thức thanh toán</strong>
          </p>
          {/* <div className="form-check">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" />
          <label className="form-check-label" htmlFor="gridRadios1">
            Thanh toán bằng thẻ
          </label>
        </div> */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gridRadios"
              id="gridRadios2"
              value="option2"
              onChange={changeMethod}
            />
            <label className="form-check-label" htmlFor="gridRadios2">
              Thanh toán bằng ví Momo
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gridRadios"
              id="gridRadios3"
              value="option3"
              defaultChecked
              onChange={changeMethod}
            />
            <label className="form-check-label" htmlFor="gridRadios3">
              Thanht toán COD
            </label>
          </div>
        </Card>
        <Card className="box-order form-group">
          <p className="clearfix">
            Tổng tiền hàng
            <span className="float-right">{totalProductPrice?.toLocaleString("vi-VN")}đ</span>
          </p>
          <p className="form-group clearfix">
            Tổng tiền vận chuyển
            <span className="float-right">{totalShippingFee?.toLocaleString("vi-VN")}đ</span>
          </p>
          <p className="border-top pt-2 clearfix">
            <strong>Tổng thanh toán</strong>
            <span className="float-right">
              <strong className="is_red">{totalPrice?.toLocaleString("vi-VN")}đ</strong>
            </span>
          </p>
          <div className="text-center mt-5">
            {!isMomo && (
              <Button
                className="btn btn-primary green text-white text-uppercase font-weight-bold"
                size="large"
                form="address-form"
                htmlType="submit"
                role="button"
              >
                Xác nhận đặt hàng
              </Button>
              // <Link
              //   className="btn btn-primary green"
              //   to={`/checkout/success`}
              //   role="button"
              // >
              //   Xác nhận đặt hàng
              // </Link>
            )}
            {isMomo && (
              <Link
                className="btn btn-primary green"
                to={`payment/${productId}`}
                role="button"
              >
                Xác nhận đặt hàng
              </Link>
            )}
          </div>

        </Card>

      </div>
    </div >
  );
}
