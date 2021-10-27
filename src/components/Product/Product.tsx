import {NavLink} from "react-router-dom";

export default function Product(props: productProps) {
    return (
        <li>
        <NavLink to={`products/${props.id}`}><img alt="logo1" src={props.imgUrl}/></NavLink>
        <p className="title">{props.name}<br/><strong>{props.price.toLocaleString('vi-VN')}đ</strong></p>
        <p className="rate">
          <span className="rate-left">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span><br/>
            <em>({props.numberOfComments} bình luận)</em>
          </span>

          <a className="btn btn-primary green" href="#test" role="button"><i className="fas fa-cart-plus"></i></a>
        </p>
      </li>
    )
}

interface productProps {
    id: number;
    name: string;
    price: number;
    numberOfComments: number;
    imgUrl: string;
}