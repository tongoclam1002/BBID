import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { HmacSHA256 } from "crypto-js";
import { product } from "../interfaces/product.interface";
import Api from "../services/api";
import Configuration from "../services/configuration";

export default function Payment(props) {
  const api = new Api();
  const config = new Configuration();
  const { id }: any = useParams();
  const [product, setProduct] = useState<product>();
  const MOMO_SECRECT_KEY = process.env.MOMO_SECRECT_KEY;
  function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }
  useEffect(() => {
    api.get(config.GET_PRODUCT_DETAIL_URL + id).then((data: product) => {
      setProduct(data);
      let randomId = generateUUID();
      let request = {
        partnerCode: "MOMOH6JY20211027",
        partnerName: "Linh Dev",
        storeId: "211027230728f0a394d",
        requestType: "captureWallet",
        ipnUrl: "https://momo.vn",
        redirectUrl: process.env.REACT_APP_MOMO_REDIRECT_URL,
        orderId: randomId,
        amount: data.price,
        lang: "vi",
        orderInfo: data.name,
        requestId: randomId,
        extraData: "",
        signature: "",
      };
      let signature = HmacSHA256(
        "accessKey=" +
          process.env.REACT_APP_MOMO_ACCESS_KEY +
          "&amount=" +
          request.amount +
          "&extraData=&ipnUrl=https://momo.vn&orderId=" +
          request.orderId +
          "&orderInfo=" +
          request.orderInfo +
          "&partnerCode=" +
          request.partnerCode +
          "&redirectUrl=" +
          request.redirectUrl +
          "&requestId=" +
          request.requestId +
          "&requestType=" +
          request.requestType,
        "" + process.env.REACT_APP_MOMO_SECRECT_KEY
      ).toString();
      request.signature = signature;
      console.log(request);
      axios({
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },

        method: "post",
        url: URL,
        data: request,
      })
        .then((response) => {
          window.location.assign(response.data.payUrl);
          console.log(response.data.payUrl);
        })
        .catch((err) => console.log(err));
    });
  }, []);

  const URL = "https://test-payment.momo.vn/v2/gateway/api/create";

  return <></>;
}