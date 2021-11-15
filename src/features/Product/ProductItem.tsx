import { Button } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { addCartItemAsync, setCart } from "../Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import api from "../../app/api/api";
import { Product } from "../../app/interfaces/product.interface";
import constant from "../../app/utils/constant";
import toast from "../../app/utils/toast";

export default function ProductItem(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {status} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  function handleAddItem(productId: number) {
    setIsLoading(true);
    api.Cart.addItem(productId)
      .then(() => {
        toast.success(constant.text.ADD_CART_ITEM_SUCCESS_MESSAGE, 0.5);
        api.Cart.get().then(cart => dispatch(setCart(cart.data)))
      })
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
        <Button icon={<i className="fas fa-cart-plus"></i>} className="btn btn-primary green text-white" loading={status.includes('pendingAddItem' + props.productId)} onClick={() => dispatch(addCartItemAsync({productId: props.productId}))}>
          
        </Button>
      </div>

    </li>
  );
}

interface Props extends Product { }
