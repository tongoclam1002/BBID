import { Button } from "antd";
import { Link } from "react-router-dom";
import { addCartItemAsync } from "../Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Product } from "../../app/interfaces/product.interface";
import Text from "antd/lib/typography/Text";

export default function ProductItem(props: Props) {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <li>
      <Link to={`/store/${props.storeId}/product/${props.productId}`}>
        <img alt="logo1" src={props.image} className="center-cropped" />

        <div className="title">
          <div className="mt-2" style={{ height: "35px", overflow: "hidden" }}>
            <Text className="ellipsis-2">{props.name}</Text>
          </div>
          <div className="mt-2"><strong>{props.price.toLocaleString("vi-VN")}đ</strong></div>
        </div>
      </Link>
      <div className="rate">
        <span className="rate-left">
          {/* <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <br /> */}
        </span>
        <Button
          icon={<i className="fas fa-cart-plus"></i>}
          className="btn btn-primary green text-white"
          loading={status === "pendingAddItem" + props.productId}
          onClick={() =>
            dispatch(addCartItemAsync({ productId: props.productId }))
          }
        ></Button>
      </div>
    </li>
  );
}

interface Props extends Product {}
