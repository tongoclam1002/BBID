import { Skeleton } from "antd";
import { useEffect } from "react";

export default function ProductDetailSkeleton({isLoading}) {
  return (
    <>
      {isLoading ? (
        <div className="box-shop">
          <div className="row">
            <div className="col-md-6 col-sm-5">
              <div className="box-product-img">
                <Skeleton.Image className="skeleton-image" />
              </div>
            </div>
            <div className="col-md-6 col-sm-7 box-info">
              <Skeleton active />
            </div>
          </div>
          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      ) : (
        <div>Không tìm thấy sản phẩm</div>
      )}
    </>
  );
}
