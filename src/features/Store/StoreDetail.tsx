import { Card } from "antd";
import { t } from "i18next";

export default function StoreDetail({ store }) {
  return (
    <>
      <Card>
        <div className="row">
          <div className="col-md-3 col-sm-4">
            <p className="box-shop-name">
              <img alt="logo1" src={store?.logo} />
            </p>
            {/* <p className="box-rate text-center">
              <span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <br />
                <em>(123 bình luận)</em>
              </span>
            </p> */}
          </div>
          <div className="col-md-9 col-sm-8 box-info">
            <h4 className="clearfix">
              {store?.name}
              <span className="float-right box-link360">
                <a
                  className="link360"
                  href={process.env.REACT_APP_VIRTUAL_MALL_URL}
                  role="button"
                >
                  360<sup>o</sup>
                </a>
              </span>
            </h4>
            <p>
              {store?.description
                ? store.description
                : t("message.EMPTY_DESCRIPTION")}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
