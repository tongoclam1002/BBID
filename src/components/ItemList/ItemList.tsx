import ItemListSkeleton from "./ItemListSkeleton";
import ItemSkeleton from "./ItemSkeleton";

export default function ItemList(props: Props) {
  return (
    <>
      <h4>{props.title}</h4>
      <div className="box-list-main product clearfix">
        <ul>
          {props.children}
          {props.isFetching && <ItemListSkeleton />}
        </ul>
      </div>
    </>
  );
}

interface Props {
  children?: React.ReactNode;
  title: string;
  isFetching: boolean;
}
