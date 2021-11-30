import Text from "antd/lib/typography/Text";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function CheckoutItem({ item }) {
  useEffect(() => console.log(item));
  return (
    <>
      {item && (
        <tr>
          <td>
            <Link to={`/store/${item.storeId}/product/${item.productId}`}>
              <img alt="product" width="100" src={item.image} />
            </Link>
          </td>
          <td>
            <Link to={`/store/${item.storeId}/product/${item.productId}`}>
              <Text>{item.productName}</Text>{" "}
              <Text type="secondary">
                {`${item.color ? item.color : ""} ${
                  item.size && item.color ? "-" : ""
                } ${item.size ? item.size : ""}`}
              </Text>
            </Link>
          </td>
          {/* <td><span className="box-input"><i className="fas fa-square-full is_brown active"></i></span></td> */}
          <td>{item.quantity}</td>
          <td>
            <strong>{item.price?.toLocaleString("vi-VN")}đ</strong>
          </td>
        </tr>
      )}
    </>
  );
}
