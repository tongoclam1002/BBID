export default function CartItem({item}) {
    return (
        <tr>
            <td><input type="checkbox" value="" /></td>
            <td><img alt="product" width="100" src={item.image} /></td>
            <td>{item.name}</td>
            <td><span className="box-input"><i className="fas fa-square-full is_brown active"></i></span></td>
            <td>{item.quantity}</td>
            <td><strong>{item.price?.toLocaleString("vi-VN")}đ</strong></td>
        </tr>
    )
}