import { Col, Row, Menu } from "antd";
import { t } from "i18next";

export default function ProfileLayout(props: profileLayoutProps) {
  return (
    <Row gutter={10}>
      <Col md={24} lg={5} sm={24} xs={24}>
        <div style={{ background: "white" }} className="pt-4 pb-5">
          <div className="box-img mb-4">
            <img alt="avatar" src="img/avatar.jpg" />
            <p>Lê Lý</p>
          </div>
          <Menu className="menu-custom">
            {/* <Menu.Item key={1} className="pr-4">
              <i className="fas fa-user mr-3"></i>Tài khoản của tôi
            </Menu.Item> */}
            <Menu.Item key={2} className="pr-4">
              <i className="fas fa-clipboard-list mr-3"></i>
              {t("profileMenu.ORDER")}
            </Menu.Item>
          </Menu>
        </div>
      </Col>
      <Col md={24} lg={19} sm={24} xs={24}>
        {props.children}
      </Col>
    </Row>
  );
}

interface profileLayoutProps {
  children?: React.ReactNode;
}
