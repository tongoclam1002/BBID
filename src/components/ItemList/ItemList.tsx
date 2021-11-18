import { Row } from "antd";
import ItemListSkeleton from "./ItemListSkeleton";

export default function ItemList(props: Props) {
  if (props.isLoading)
    return <ItemListSkeleton lg={props.lg} md={props.lg} sm={props.lg} height={props.height}/>;
  return (
    <>
      {props.title && <h4>{props.title}</h4>}
      <Row className="box-list-main product clearfix" gutter={16}>
        {props.children}
        
      </Row>   
    </>
  );
}

interface Props {
  children?: React.ReactNode;
  title?: string;
  isLoading: boolean;
  lg: number;
  md: number;
  sm: number;
  height: number;
}
