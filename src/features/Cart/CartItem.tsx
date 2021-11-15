import Text from "antd/lib/typography/Text";
import { useState } from "react";
import { removeItem, setCart } from "./cartSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import api from "../../app/api/api";
import { Product } from "../../app/interfaces/product.interface";
import { Button } from "antd";

export default function CartItem({ item }) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    function handleRemoveItem(productId: number, quantity = 1) {
        setIsLoading(true);
        api.Cart.removeItem(productId)
            .then(() => {
                dispatch(removeItem({ productId, quantity }))
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }

    return (
        <tr>
            <td><input type="checkbox" value="" /></td>
            <td><img alt="product" width="100" src={item.image} /></td>
            <td>{item.name}</td>
            {/* <td><span className="box-input"><i className="fas fa-square-full is_brown active"></i></span></td> */}
            <td>{item.quantity}</td>
            <td><strong>{item.price?.toLocaleString("vi-VN")}đ</strong></td>
            <td><Button icon="Xóa" loading={isLoading} onClick={() => handleRemoveItem(item.productId)} style={{ padding: '4px 15px', width: 'auto' }} danger></Button></td>
        </tr>
    )
}