import ItemListSkeleton from "./ItemListSkeleton";


export default function ItemList(props: Props) {
  if (props.isLoading) return <ItemListSkeleton />;
  return (
    <>
        {props.title && <h4>{props.title}</h4>}
        <div className="box-list-main product clearfix">
          <ul>
            {props.children}
          </ul>
        </div>
    </>
  );
}

interface Props {
  children?: React.ReactNode;
  title?: string;
  isLoading: boolean;
}
