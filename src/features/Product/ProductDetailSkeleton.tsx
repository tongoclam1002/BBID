import { Card, Empty, Skeleton } from "antd";
import { t } from "i18next";

export default function ProductDetailSkeleton({isLoading}) {
  return (
    <Card className="w-100">
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
        <Empty description={t("message.EMPTY_PRODUCT")} />
      )}
    </Card>
  );
}
