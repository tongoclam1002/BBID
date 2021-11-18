import { Col, Row } from "antd";
import ItemSkeleton from "./ItemSkeleton";

export default function ItemListSkeleton({lg, md, sm, height}) {
  return (
    <>
      <Row className="box-list-main product clearfix" gutter={16}>
          <Col lg={lg} md={md} sm={sm} className="skeleton-custom">
            <ItemSkeleton height={height}/>
          </Col >
          <Col lg={lg} md={md} sm={sm} className="skeleton-custom">
            <ItemSkeleton height={height}/>
          </Col>
          <Col lg={lg} md={md} sm={sm} className="skeleton-custom">
            <ItemSkeleton height={height}/>
          </Col>
      </Row>
    </>
  );
}
