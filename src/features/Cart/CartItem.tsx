import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Button, Checkbox } from "antd";
import {
  removeCartItemAsync,
  selectItem,
  updateCartItemAsync,
} from "./cartSlice";
import Text from "antd/lib/typography/Text";
import { Link } from "react-router-dom";
import IncreaseDecreaseInput from "../../components/IncreaseDecreaseInput";
import PriceAndDiscountPrice from "../../components/PriceAndDiscountPrice";
import { getPrice } from "../../app/utils/utils";
import { t } from "i18next";

export default function CartItem({ item }) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.cart);

  function onBlur(e, value) {
    if (e.target.value > 0 && value !== e.target.value)
      dispatch(
        updateCartItemAsync({
          productDetailId: item?.productDetailId,
          quantity: e.target.value,
        })
      );
  }

  function updateCartItemQuantity(productDetailId, quantity, name) {
    if (quantity > 0)
      dispatch(
        updateCartItemAsync({
          productDetailId: productDetailId,
          quantity: quantity,
          name: name,
        })
      );
  }

  return (
    <tr>
      <td>
        <Checkbox
          checked={item.isSelected}
          onChange={() => dispatch(selectItem(item.productDetailId))}
        ></Checkbox>
      </td>
      <td>
        <Link to={`/store/${item.storeId}/product/${item.productId}`}>
          <img alt="product" width="100" src={item.image} />
        </Link>
      </td>
      <td>
        <Link to={`/store/${item.storeId}/product/${item.productId}`}>
          <Text>{item.productName}</Text>
        </Link>
        <div>
          <Text type="secondary">{`${item.color ? item.color : ""} ${
            item.size && item.color ? "-" : ""
          } ${item.size ? item.size : ""}`}</Text>
        </div>
      </td>
      <td>
        <IncreaseDecreaseInput
          onBlur={(e) => onBlur(e, item.quantity)}
          loadingIncrease={
            status === "pendingUpdateItem" + item.productDetailId + "increase"
          }
          loadingDecrease={
            status === "pendingUpdateItem" + item.productDetailId + "decrease"
          }
          value={item.quantity}
          increaseValue={() =>
            updateCartItemQuantity(
              item?.productDetailId,
              item.quantity + 1,
              "increase"
            )
          }
          decreaseValue={() =>
            updateCartItemQuantity(
              item?.productDetailId,
              item.quantity - 1,
              "decrease"
            )
          }
        />
      </td>
      <td>
        <PriceAndDiscountPrice
          price={item.price}
          discountPrice={item.discountPrice}
        />
      </td>
      <td>
        <strong>
          {(
            getPrice(item.price, item.discountPrice) * item.quantity
          )?.toLocaleString("vi-VN")}
          đ
        </strong>
      </td>
      <td>
        <Button
          icon={<Text type="danger">{t("common.DELETE")}</Text>}
          loading={status === "pendingRemoveItem" + item.productDetailId}
          onClick={() =>
            dispatch(
              removeCartItemAsync({
                productDetailId: item?.productDetailId,
                quantity: item.quantity,
              })
            )
          }
          style={{ padding: "4px 15px", width: "auto" }}
          danger
        ></Button>
      </td>
    </tr>
  );
}
