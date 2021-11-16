import { Card, Empty, Skeleton } from "antd";
import constant from "../../app/utils/constant";

export default function ProductDetailSkeleton({isLoading}) {
  return (
    <Card>
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
        <Empty description={constant.text.EMPTY_PRODUCT} />
      )}
    </Card>
  );
}
