import { NavLink } from "react-router-dom";

export default function StoreItem(props: Props) {
  return (
    <li>
      <NavLink to={`store/${props.storeId}`} className="hover1">
        <img alt={`${props.name} logo`} src={props.image} className="center-cropped" />
      </NavLink>
    </li>
  );
}

interface Props {
  storeId: number;
  image: string;
  name: string;
}
