import Text from "antd/lib/typography/Text";
import { useState } from "react";
import { setCart } from "./cartSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import api from "../../app/api/api";

export default function CartItem({ item }) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    function handleRemoveItem(productId: number) {
        setIsLoading(true);
        api.Cart.removeItem(productId)
            .then(() =>
                api.Cart.get().then(cart => dispatch(setCart(cart.data)))
            )
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }
    return (
        <tr>
            <td><input type="checkbox" value="" /></td>
            <td><img alt="product" width="100" src={item.image} /></td>
            <td>{item.name}</td>
            <td><span className="box-input"><i className="fas fa-square-full is_brown active"></i></span></td>
            <td>{item.quantity}</td>
            <td><strong>{item.price?.toLocaleString("vi-VN")}đ</strong></td>
            <td><Text type="danger" style={{ cursor: "pointer" }} onClick={() => handleRemoveItem(item.productId)}>Xóa</Text></td>
        </tr>
    )
}