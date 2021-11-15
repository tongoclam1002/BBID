import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Button } from "antd";
import { removeCartItemAsync } from "./cartSlice";
import Text from "antd/lib/typography/Text";
import { Link } from "react-router-dom";

export default function CartItem({ item }) {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.cart);

    return (
        <tr>
            <td><input type="checkbox" value="" /></td>
            <td><Link to={`/store/${item.storeId}/product/${item.productId}`}><img alt="product" width="100" src={item.image} /></Link></td>
            <td><Link to={`/store/${item.storeId}/product/${item.productId}`}><Text>{item.name}</Text></Link></td>
            {/* <td><span className="box-input"><i className="fas fa-square-full is_brown active"></i></span></td> */}
            <td>{item.quantity}</td>
            <td><strong>{item.price?.toLocaleString("vi-VN")}đ</strong></td>
            <td><Button icon={<Text type="danger">Xóa</Text>} loading={status === "pendingRemoveItem" + item.productId} onClick={() => dispatch(removeCartItemAsync({ productId: item?.productId, quantity: item.quantity }))} style={{ padding: '4px 15px', width: 'auto' }} danger></Button></td>
        </tr>
    )
}