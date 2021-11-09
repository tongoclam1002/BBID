import { Skeleton } from "antd";

export default function StoreDetailSketon({ isFetching }) {
  return (
    <>
      {isFetching ? (
        <div className="row">
          <div className="col-md-3 col-sm-4">
            <Skeleton.Image className="skeleton-image" />
          </div>
          <div className="col-md-9 col-sm-8 box-info">
            <Skeleton active />
          </div>
        </div>
      ) : (
        <div>Không tìm thấy cửa hàng</div>
      )}
    </>
  );
}
