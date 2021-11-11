import { Button } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { setCart } from "../../redux/cartSlice";
import { useAppDispatch } from "../../redux/configureStore";
import api from "../../services/api";

export default function ProductItem(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  function handleAddItem(productId: number) {
    setIsLoading(true);
    api.Cart.addItem(productId)
      .then(() =>
        api.Cart.get().then(cart => dispatch(setCart(cart.data)))
        )
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <li>
      <NavLink to={`/store/${props.storeId}/product/${props.productId}`}>
        <img alt="logo1" src={props.image} className="center-cropped" />
      </NavLink>
      <p className="title">
        {props.name}
        <br />
        <strong>{props.price.toLocaleString("vi-VN")}đ</strong>
      </p>
      <div className="rate">
        <span className="rate-left">
          {/* <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <br /> */}
        </span>
        <Button className="btn btn-primary green text-white" loading={isLoading} onClick={() => handleAddItem(props.productId)}>
          <i className="fas fa-cart-plus"></i>
        </Button>
      </div>

    </li>
  );
}

interface Props extends Product { }
