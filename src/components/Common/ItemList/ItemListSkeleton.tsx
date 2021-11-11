import ItemSkeleton from "./ItemSkeleton";

export default function ItemListSkeleton() {
  return (
    <>
      <div className="box-list-main product clearfix">
        <ul>
          <li className="skeleton">
            <ItemSkeleton />
          </li >
          <li className="skeleton">
            <ItemSkeleton />
          </li>
          <li className="skeleton">
            <ItemSkeleton />
          </li>
        </ul>
      </div>
    </>
  );
}
