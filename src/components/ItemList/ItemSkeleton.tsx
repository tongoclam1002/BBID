import { Skeleton } from "antd";

export default function ItemSkeleton({height}) {
  return (
    <Skeleton.Avatar
      active
      size={height}
      style={{ width: "100%" }}
      shape="square"
    />
  );
}
