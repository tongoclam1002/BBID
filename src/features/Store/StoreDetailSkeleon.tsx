import { Card, Empty, Skeleton } from "antd";
import constant from "../../app/utils/constant";

export default function StoreDetailSketon({ isLoading }) {
  return (
    <Card>
      {isLoading ? (
        <div className="row">
          <div className="col-md-3 col-sm-4">
            <Skeleton.Image className="skeleton-image" />
          </div>
          <div className="col-md-9 col-sm-8 box-info">
            <Skeleton active />
          </div>
        </div>
      ) : (
        <Empty description={constant.text.EMPTY_STORE} />
      )}
    </Card>
  );
}
