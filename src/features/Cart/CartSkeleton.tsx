import { Card, Col, Row, Skeleton } from "antd";

export default function CartSkeleton() {
    return (
        <Row gutter={10}>
            <Col lg={16} md={24}>
                <Card className="mb-4">
                    <Card><Skeleton active /></Card>
                </Card>
                <Card>
                    <Card><Skeleton active /></Card>
                </Card>
            </Col>
            <Col lg={8} md={24}>
                <Card className="box-total">
                    <Skeleton active />
                </Card>
            </Col>
        </Row>
    )
}