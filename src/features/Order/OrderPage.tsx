import { Card, Col, Row, Tabs } from "antd";
import { t } from "i18next";
import { useEffect, useState } from "react";
import api from "../../app/api/api";

export default function OrderPage() {
  const [orders, setOrders] = useState(null);
  const { TabPane } = Tabs;
  function callback(key) {
    // console.log(key);
  }
  useEffect(() => {
    api.Order.list().then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      {/* <Card className="box-process mb-3 w-100"> */}
      <Card className="mb-3 p-0">
        <Tabs className="tabs-custom" defaultActiveKey="1" onChange={callback} size="large">
          <TabPane tab={t("orderStatus.ALL")} key="1">
            {/* Content of Tab Pane 1 */}
          </TabPane>
          <TabPane
            tab={t("orderStatus.AWATING_CONFIRMATION")}
            key="2"
          ></TabPane>
          <TabPane tab={t("orderStatus.AWATING_DELIVERY")} key="3"></TabPane>
          <TabPane tab={t("orderStatus.DELIVERING")} key="4"></TabPane>
          <TabPane tab={t("orderStatus.COMPLETED")} key="5"></TabPane>
        </Tabs>
      </Card>
      {/* <div className="row">
          <div className="col-md-3 col-sm-6 sm-mb-15">
            <div className="box-status">
              <i className="fas fa-clipboard-check green"></i>
            </div>
            <p>{t("orderStatus.ALL")}</p>
          </div>
          <div className="col-md-3 col-sm-6 sm-mb-15">
            <div className="box-status">
              <i className="fas fa-archive"></i>
              <em>1</em>
            </div>
            <p>{t("orderStatus.AWATING_CONFIRMATION")}</p>
          </div>
          <div className="col-md-3 col-sm-6 sm-mb-15">
            <div className="box-status">
              <i className="fas fa-truck"></i>
            </div>
            <p>{t("orderStatus.AWATING_DELIVERY")}</p>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="box-status">
              <i className="fas fa-star"></i>
            </div>
            <p>{t("orderStatus.DELIVERING")}</p>
          </div>
        </div> */}
      {/* </Card> */}
      <Row>
        <Col span={24}>
          {orders?.map((order, key) => (
            <Card key={key} className="mb-2">
              <div className="box-order form-group">
                {/* <p className="box-cart-shop">
                  <strong>Rolex</strong> <i className="fas fa-angle-right"></i>
                </p> */}
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="img-td">{t("product.IMAGE")}</th>
                        <th className="w-15vw">{t("product.PRODUCT_NAME")}</th>
                        <th>{t("product.QUANTITY")}</th>
                        <th>{t("product.PRICE")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.productOrders.map((product, key) => (
                        <tr key={key}>
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
                            <strong>
                              {(
                                product.quantity * product.price
                              ).toLocaleString("vi-VN")}
                              đ
                            </strong>
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
