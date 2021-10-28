import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../../models/product.model";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const { id }: any = useParams();
  const [product, setProduct] = useState<product>();
  const instance = axios.create({
    baseURL: "https://test-payment.momo.vn",
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    },
  });

  const PROXY_URL = "http://localhost:5000/";
  const URL = "/v2/gateway/api/create";

  const requestOptions = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    mode: "no-cors" as RequestMode,
    body: JSON.stringify({
      partnerCode: "MOMOH6JY20211027",
      partnerName: "Linh Dev",
      storeId: "211027230728f0a394d",
      requestType: "captureWallet",
      ipnUrl: "https://momo.vn",
      redirectUrl: "https://momo.vn",
      orderId: "MM1540456472575",
      amount: 150000,
      lang: "vi",
      orderInfo: "SDKteam",
      requestId: "MM1540456472575",
      extraData: "",
      signature:
        "24d859b2314758365424aebd7cc16ce60b4106ecdc05abbd0fd2cf7297fab0d6",
    }),
  };

  useEffect(() => {
    axios({
        headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
          },

        method: 'post',
        url: URL,
        data: {
            "partnerCode": "MOMOH6JY20211027",
            "partnerName" : "Linh Dev",
            "storeId" : "211027230728f0a394d",
            "requestType": "captureWallet",
            "ipnUrl": "https://momo.vn",
            "redirectUrl": "https://momo.vn",
            "orderId": "MM1540456472575",
            "amount": 150000,
            "lang":  "vi",
            "orderInfo": "SDKteam",
            "requestId": "MM1540456472575",
            "extraData": "",
            "signature": "24d859b2314758365424aebd7cc16ce60b4106ecdc05abbd0fd2cf7297fab0d6"
          }
      })
      .then(response => {

            console.log(response);
          })
      .catch(err => console.log(err));
    fetch(URL, requestOptions)
      .then(function (response) {
        return response;
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (e) {
        console.log(e);
      });
  }, []);
  return (
    <div className="box-shop">
      <div className="row">
        <div className="col-md-6 col-sm-5">
          <p className="box-product-img">
            <img
              alt="logo1"
              src={`${process.env.PUBLIC_URL}/${product?.img}`}
            />
          </p>
        </div>
        <div className="col-md-6 col-sm-7 box-info">
          <h4 className="clearfix">
            <span className="float-left">
              {product?.name}
              <br />
              <span className="box-rate">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <em>(123 bình luận)</em>
              </span>
            </span>
            <span className="float-right box-link360">
              <a className="link360" href="#test" role="button">
                360<sup>o</sup>
              </a>
            </span>
          </h4>
          <p className="title">
            <strong>{product?.price.toLocaleString("vi-VN")}đ</strong>
          </p>
          <p>
            <a className="link-showdhide" href="#test">
              <i className="fas fa-angle-right"></i> Chi tiết
            </a>
          </p>
          <div className="box-display">
            <p>Nội dung..</p>
          </div>
          <p>
            <a className="link-showdhide" href="#test">
              <i className="fas fa-angle-right"></i> Nổi bật
            </a>
          </p>
          <div className="box-display">
            <p>Nội dung..</p>
          </div>
          <div className="row box-input">
            <div className="col-3">
              <select className="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="col-9 box-select">
              <i className="fas fa-square-full is_gray"></i>
              <i className="fas fa-square-full is_brown"></i>
            </div>
          </div>
          <p>
            <NavLink
              className="btn btn-primary green is-bigger"
              href="#test"
              role="button"
              to={`/order/${product?.id}`}
            >
              Mua ngay
            </NavLink>
            <a className="icon-cart" href="#test">
              <i className="fas fa-cart-plus"></i>
            </a>
          </p>
          <p className="box-btn">
            <a className="btn red sm-mb-15 sm-block" href="#test" role="button">
              <i className="fas fa-heart"></i>Thêm vào yêu thích
            </a>
            <a className="btn turquoise" href="#test" role="button">
              <i className="fas fa-exchange-alt"></i>So sánh
            </a>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12"></div>
      </div>
    </div>
  );
}
