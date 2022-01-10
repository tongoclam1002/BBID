import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../app/api/api";
import CheckoutItem from "./CheckoutItem";
import { Button, Card, Empty, Form } from "antd";
import AddressForm from "./AddressForm";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { history } from "../..";
import { fetchCartAsync } from "../Cart/cartSlice";
import toast from "../../app/utils/toast";
import { t } from "i18next";

export default function CheckoutPage() {
  const { productId }: any = useParams();
  const [form] = Form.useForm();
  const [isMomo, setIsMomo] = useState(false);
  const { selectedCart, totalPrice: totalProductPrice } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();
  const totalShippingFee = 50000;
  const totalPrice = totalProductPrice
    ? totalProductPrice
    : 0 + totalShippingFee;

  function changeMethod() {
    setIsMomo(!isMomo);
  }

  const onFinish = (values: any) => {
    // console.log(values);
    let productIds = [];
    console.log(selectedCart);
    selectedCart.forEach((store) => {
      store.productList.forEach((product) => {
        productIds.push(product.productDetailId);
      });
    });

    if (productIds !== []) {
      api.Order.createOrder(
        values.address,
        values.name,
        values.phone,
        productIds
      )
        .then(() => {
          history.push("/checkout/success");
          dispatch(fetchCartAsync());
        })
        .catch((error) => {
          console.log("Create order error: " + error);
        });
    } else {
      toast.warning(t("message.EMPTY_SELECTED_PRODUCT_IN_CART"), 0.5);
    }
  };

  const onFinishFailed = () => {
    toast.warning(t("message.EMPTY_CHECKOUT_INFO"), 0.5);
  };

  return (
    <div className="row">
      <div className="col-12">
        <Card className="box-order">
          <h4 className="mb-4">{t("order.ORDER_INFORMATION")}</h4>
          <Card className="mb-4">
            <p className="form-group clearfix">
              <strong>{t("order.DELIVERY_ADDRESS")}</strong>
            </p>
            <AddressForm
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            />
          </Card>
          {selectedCart.length > 0 ? (
            selectedCart.map((store, key) => (
              <Card key={key} className="mb-4">
                <p className="box-cart-shop clearfix">{store.storeId}</p>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="is-img">{t("product.IMAGE")}</th>
                        <th className="no-break">
                          {t("product.PRODUCT_NAME")}
                        </th>
                        <th className="is-count">{t("product.QUANTITY")}</th>
                        <th className="no-break">{t("product.PRICE")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {store?.productList?.map((item, key) => (
                        <CheckoutItem key={key} item={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ))
          ) : (
            <Card className="mb-4">
              <Empty
                description={t("message.EMPTY_SELECTED_PRODUCT_IN_CART")}
              />
            </Card>
          )}
          <p>{t("order.NOTES")}: </p>
          <p className="form-group">
            <textarea className="form-control form-control-sm"></textarea>
          </p>
        </Card>
        {/* <Card className="box-order">
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
        </Card> */}
        <Card className="box-order">
          <p className="form-group">
            <strong>{t("order.PAYMENT_METHODS")}</strong>
          </p>
          {/* <div className="form-check">
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
          </div> */}
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
              {t("order.COD_PAYMENT")}
            </label>
          </div>
        </Card>
        <Card className="box-order form-group">
          <p className="clearfix">
            {t("order.TOTAL_PRICE")}
            <span className="float-right">
              {totalProductPrice?.toLocaleString("vi-VN")}đ
            </span>
          </p>
          <p className="form-group clearfix">
            {t("order.SHIPPING_FEE")}
            <span className="float-right">
              {totalShippingFee?.toLocaleString("vi-VN")}đ
            </span>
          </p>
          <p className="border-top pt-2 clearfix">
            <strong>{t("order.ORDER_TOTAL")}</strong>
            <span className="float-right">
              <strong className="is_red">
                {totalPrice?.toLocaleString("vi-VN")}đ
              </strong>
            </span>
          </p>
          <div className="text-center mt-5">
            {!isMomo && (
              <Button
                className="btn btn-primary green text-white text-uppercase font-weight-bold"
                size="large"
                form="address-form"
                htmlType="submit"
              >
                {t("order.PLACE_ORDER")}
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
                {t("order.PLACE_ORDER")}
              </Link>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
