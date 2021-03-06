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
          productId: item?.productId,
          quantity: e.target.value,
        })
      );
  }

  function updateCartItemQuantity(productId, quantity, name) {
    if (quantity > 0)
      dispatch(
        updateCartItemAsync({
          productId: productId,
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
          onChange={() => dispatch(selectItem(item.productId))}
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
      </td>
      <td>
        <IncreaseDecreaseInput
          onBlur={(e) => onBlur(e, item.quantity)}
          loadingIncrease={
            status === "pendingUpdateItem" + item.productId + "increase"
          }
          loadingDecrease={
            status === "pendingUpdateItem" + item.productId + "decrease"
          }
          value={item.quantity}
          increaseValue={() =>
            updateCartItemQuantity(
              item?.productId,
              item.quantity + 1,
              "increase"
            )
          }
          decreaseValue={() =>
            updateCartItemQuantity(
              item?.productId,
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
          ??
        </strong>
      </td>
      <td>
        <Button
          icon={<Text type="danger">{t("common.DELETE")}</Text>}
          loading={status === "pendingRemoveItem" + item.productId}
          onClick={() =>
            dispatch(
              removeCartItemAsync({
                productId: item?.productId,
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
