import {NavLink} from "react-router-dom";
import { product } from "../../../models/product.model";

export default function Product(props: Props) {
    return (
        <li>
        <NavLink to={`products/${props.productId}`}><img alt="logo1" src={props.image}/></NavLink>
        <p className="title">{props.name}<br/><strong>{props.price.toLocaleString('vi-VN')}đ</strong></p>
        <p className="rate">
          <span className="rate-left">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span><br/>
          </span>

          <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
        </p>
      </li>
    )
}

interface Props extends product {

}